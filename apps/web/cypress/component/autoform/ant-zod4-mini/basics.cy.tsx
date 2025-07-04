import React from "react";
import { AutoForm } from "@autoform/ant";
import { ZodProvider } from "@autoform/zod";
import { z } from "zod/v4-mini";

describe("AutoForm Basic Tests (ANT-ZOD-V4-MINI)", () => {
  const basicSchema = z.object({
    name: z.string().check(
      z.minLength(2)
      // Zod Mini does not support custom error messages in .check() refinements
    ),
    age: z.coerce.number().check(
      z.gte(18)
      // Custom error messages are not supported in .check()
    ),
    email: z.string(), // Zod Mini does not provide a built-in .email() check
    website: z.optional(z.string()), // .url() is not available in Zod Mini
    birthdate: z.coerce.date(),
    isStudent: z.boolean(),
  });

  const schemaProvider = new ZodProvider(basicSchema);

  it("renders all field types correctly", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />
    );

    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="age"]').should("have.class", "ant-input-number-input");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="website"]').should("exist");
    cy.get('input[name="birthdate"]');
    cy.get('input[name="isStudent"]').should(
      "have.class",
      "ant-checkbox-input"
    );
  });

  it("submits form with correct data types", () => {
    const onSubmit = cy.stub().as("onSubmit");
    cy.mount(
      <AutoForm schema={schemaProvider} onSubmit={onSubmit} withSubmit />
    );

    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="age"]').type("25");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="website"]').type("https://example.com");
    cy.get('input[name="birthdate"]').clear().type("1990-01-01");
    cy.get('input[name="isStudent"]').check();

    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit").should("have.been.calledWith", {
      name: "John Doe",
      age: 25,
      email: "john@example.com",
      website: "https://example.com",
      birthdate: new Date("1990-01-01"),
      isStudent: true,
    });
  });
});
