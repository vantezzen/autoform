import React from "react";
import { AutoForm } from "@autoform/mui";
import { ZodProvider } from "@autoform/zod";
import { z } from "zod/v3";

describe("AutoForm Arrays Tests (MUI-ZOD)", () => {
  const arraySchema = z.object({
    tags: z.array(z.string()),
    friends: z.array(
      z.object({
        name: z.string(),
        age: z.coerce.number(),
      })
    ),
  });

  const schemaProvider = new ZodProvider(arraySchema);

  it("renders array fields correctly", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />
    );

    cy.get("[data-testid='AddIcon']").should("exist");
    cy.get("[data-testid='AddIcon']").should("exist");
  });

  it("allows adding and removing array items", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />
    );

    // Add tags
    cy.get("[data-testid='AddIcon']").eq(0).click();
    cy.get('input[name="tags.0"]').type("tag1");
    cy.get("[data-testid='AddIcon']").eq(0).click();
    cy.get('input[name="tags.1"]').type("tag2");

    // Add friends
    cy.get("[data-testid='AddIcon']").eq(1).click();
    cy.get('input[name="friends.0.name"]').type("Alice");
    cy.get('input[name="friends.0.age"]').type("25");
    cy.get("[data-testid='AddIcon']").eq(1).click();
    cy.get('input[name="friends.1.name"]').type("Bob");
    cy.get('input[name="friends.1.age"]').type("30");

    // Remove a tag and a friend
    cy.get("[data-testid='DeleteIcon']").eq(0).click();
    cy.get("[data-testid='DeleteIcon']").eq(1).click();

    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit").should("have.been.calledWith", {
      tags: ["tag2"],
      friends: [{ name: "Bob", age: 30 }],
    });
  });
});
