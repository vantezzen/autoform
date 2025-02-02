import React from "react";
import { AutoForm } from "@autoform/chakra";
import { ZodProvider, fieldConfig } from "@autoform/zod";
import { z } from "zod";

describe("AutoForm Basic Tests", () => {
  const basicSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.coerce.number().min(18, "Must be at least 18 years old"),
    email: z.string().email("Invalid email address"),
    website: z.string().url("Invalid URL").optional(),
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
    cy.get('input[name="age"]').should(
      "have.attr",
      "data-scope",
      "number-input"
    );
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="website"]').should("exist");
    cy.get('input[name="birthdate"]');
    cy.get('input[name="isStudent"]').should(
      "have.attr",
      "type",
      "checkbox"
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
    cy.get('input[name="isStudent"]').parent().find('.chakra-checkbox__control').click();

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
