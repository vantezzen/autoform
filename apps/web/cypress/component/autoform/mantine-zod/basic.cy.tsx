import React from "react";
import { AutoForm } from "@autoform/mantine";
import { ZodProvider, fieldConfig } from "@autoform/zod";
import { z } from "zod/v3";
import { TestWrapper } from "./utils";

enum Sports {
  Football = "Football/Soccer",
  Basketball = "Basketballs",
  Baseball = "Baseballs",
  Hockey = "Hockey (Ice)",
  None = "I don't like sports",
}

describe("AutoForm Basic Tests (MANTINE-ZOD)", () => {
  const basicSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.coerce.number().min(18, "Must be at least 18 years old"),
    email: z.string().email("Invalid email address"),
    website: z.string().url("Invalid URL").optional(),
    sports: z.nativeEnum(Sports),
    birthdate: z.coerce.date(),
    isStudent: z.boolean(),
  });

  const schemaProvider = new ZodProvider(basicSchema);

  it("renders all field types correctly", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>
    );

    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="age"]').should("have.attr", "type", "number");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="website"]').should("exist");
    cy.get('input[name="sports"]').should("exist");
    cy.get('[data-dates-input="true"]').should("exist");
    cy.get('input[name="isStudent"]').should("have.attr", "type", "checkbox");
  });

  it("submits form with correct data types", () => {
    const onSubmit = cy.stub().as("onSubmit");
    cy.mount(
      <TestWrapper>
        <AutoForm schema={schemaProvider} onSubmit={onSubmit} withSubmit />
      </TestWrapper>
    );

    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="age"]').type("25");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="website"]').type("https://example.com");
    cy.get('input[name="isStudent"]').check();
    cy.get(".mantine-Select-input").eq(0).click();
    cy.get('.mantine-Select-option[value="Hockey (Ice)"]')
      .should("exist")
      .and("be.visible")
      .click();
    cy.get('[data-dates-input="true"]').type("1990-01-01");
    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit").should("have.been.calledWith", {
      name: "John Doe",
      age: 25,
      email: "john@example.com",
      website: "https://example.com",
      sports: "Hockey (Ice)",
      birthdate: new Date("1990-01-01"),
      isStudent: true,
    });
  });
});
