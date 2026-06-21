import React from "react";
import { ZodProvider } from "@acp-autoform/zod";
import { z } from "zod/v3";
import { autoFormAdapters, TestWrapper } from "./utils";

autoFormAdapters.forEach(({ name, AutoForm }) => {
  describe(`AutoForm Arrays Tests (SHADCN-ZOD, ${name})`, () => {
  const arraySchema = z.object({
    tags: z.array(z.string()),
    friends: z.array(
      z.object({
        name: z.string(),
        age: z.coerce.number(),
      }),
    ),
  });

  const schemaProvider = new ZodProvider(arraySchema);

  it("renders array fields correctly", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>,
    );

    cy.get(".lucide-plus").should("exist");
    cy.get(".lucide-plus").should("exist");
  });

  it("allows adding and removing array items", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>,
    );

    // Add tags
    cy.get(".lucide-plus").eq(0).click();
    cy.get('input[name="tags.0"]').type("tag1");
    cy.get(".lucide-plus").eq(0).click();
    cy.get('input[name="tags.1"]').type("tag2");

    // Add friends
    cy.get(".lucide-plus").eq(1).click();
    cy.get('input[name="friends.0.name"]').type("Alice");
    cy.get('input[name="friends.0.age"]').type("25");
    cy.get(".lucide-plus").eq(1).click();
    cy.get('input[name="friends.1.name"]').type("Bob");
    cy.get('input[name="friends.1.age"]').type("30");

    // Remove a tag and a friend
    cy.get(".lucide-trash").eq(0).click();
    cy.get(".lucide-trash").eq(1).click();

    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit").should("have.been.calledWith", {
      tags: ["tag2"],
      friends: [{ name: "Bob", age: 30 }],
    });
  });

  if (name === "tanstack-form") {
    it("focuses and validates a newly added nested array item", () => {
      const nestedArraySchema = z.object({
        friends: z.array(
          z.object({
            name: z.string(),
            profile: z.object({
              details: z.object({
                email: z.string(),
              }),
            }),
          }),
        ),
      });

      cy.mount(
        <TestWrapper>
          <AutoForm schema={new ZodProvider(nestedArraySchema)} withSubmit />
        </TestWrapper>,
      );

      cy.get(".lucide-plus").click();

      cy.focused().should("have.attr", "name", "friends.0.name");
      cy.get('input[name="friends.0.name"]')
        .should("have.attr", "aria-invalid", "true");
      cy.get('input[name="friends.0.profile.details.email"]')
        .should("have.attr", "aria-invalid", "true");
    });

    it("shows every nested array item error on submit and change", () => {
      const requiredArraySchema = z.object({
        friends: z.array(
          z.object({
            name: z.string(),
            profile: z.object({
              city: z.string(),
              details: z.object({
                email: z.string(),
              }),
            }),
          }),
        ),
      });

      cy.mount(
        <TestWrapper>
          <AutoForm
            schema={new ZodProvider(requiredArraySchema)}
            onSubmit={cy.stub().as("onSubmit")}
            withSubmit
          />
        </TestWrapper>,
      );

      cy.get(".lucide-plus").click();
      cy.get('button[type="submit"]').click();

      cy.get('input[name="friends.0.name"]')
        .should("have.attr", "aria-invalid", "true");
      cy.get('input[name="friends.0.profile.city"]')
        .should("have.attr", "aria-invalid", "true");
      cy.get('input[name="friends.0.profile.details.email"]')
        .should("have.attr", "aria-invalid", "true");
      cy.get("@onSubmit").should("not.have.been.called");

      cy.get('input[name="friends.0.profile.city"]').type("Paris");

      cy.get('input[name="friends.0.name"]')
        .should("have.attr", "aria-invalid", "true");
      cy.get('input[name="friends.0.profile.city"]')
        .should("not.have.attr", "aria-invalid");
      cy.get('input[name="friends.0.profile.details.email"]')
        .should("have.attr", "aria-invalid", "true");
    });

    it("keeps nested array errors visible when Enter submits", () => {
      const onFormInit = cy.stub().as("onFormInit");
      const nestedArraySchema = z.object({
        friends: z.array(
          z.object({
            profile: z.object({
              details: z.object({
                email: z.string(),
              }),
            }),
          }),
        ),
      });

      cy.mount(
        <TestWrapper>
          <AutoForm
            schema={new ZodProvider(nestedArraySchema)}
            onSubmit={cy.stub().as("onSubmit")}
            onFormInit={onFormInit}
            withSubmit
          />
        </TestWrapper>,
      );

      cy.get(".lucide-plus").click();
      cy.get('input[name="friends.0.profile.details.email"]').type("{enter}");

      cy.get('input[name="friends.0.profile.details.email"]')
        .should("have.attr", "aria-invalid", "true");
      cy.get("@onSubmit").should("not.have.been.called");
      cy.get("@onFormInit").then((stub: any) => {
        expect(stub.firstCall.args[0].state.submissionAttempts).to.equal(1);
      });
    });
  }
});
});
