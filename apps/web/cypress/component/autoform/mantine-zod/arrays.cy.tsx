import React from "react";
import { ZodProvider } from "@acp-autoform/zod";
import { z } from "zod/v3";
import { autoFormAdapters, TestWrapper } from "./utils";

autoFormAdapters.forEach(({ name, AutoForm }) => {
  describe(`AutoForm Arrays Tests (MANTINE-ZOD), ${name}`, () => {
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

    cy.get('button[aria-label="add Tags"]').should("exist");
    cy.get('button[aria-label="add Friends"]').should("exist");
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
    cy.get('button[aria-label="add Tags"]').click();
    cy.get('input[name="tags.0"]').type("tag1");
    cy.get('button[aria-label="add Tags"]').click();
    cy.get('input[name="tags.1"]').type("tag2");

    // Add friends
    cy.get('button[aria-label="add Friends"]').click();
    cy.get('input[name="friends.0.name"]').type("Alice");
    cy.get('input[name="friends.0.age"]').type("25");
    cy.get('button[aria-label="add Friends"]').click();
    cy.get('input[name="friends.1.name"]').type("Bob");
    cy.get('input[name="friends.1.age"]').type("30");

    // Remove a tag and a friend
    cy.get('[data-testid="remove-item-button"]').eq(0).click();
    cy.get('[data-testid="remove-item-button"]').eq(1).click();

    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit").should("have.been.calledWith", {
      tags: ["tag2"],
      friends: [{ name: "Bob", age: 30 }],
    });
  });
});
});
