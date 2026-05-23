import React from "react";
import { AutoForm } from "@autoform/ant";
import { ZodProvider, fieldConfig } from "@autoform/zod";
import { z } from "zod/v3";

describe("AutoForm Basic Tests (ANT-ZOD)", () => {
  const basicSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.coerce.number().min(18, "Must be at least 18 years old"),
    email: z.string().email("Invalid email address"),
    website: z.string().url("Invalid URL").optional(),
    color: z.enum(["red", "green", "blue"]),
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
    cy.get('input[id="color"]').should("exist");
    cy.get('input[name="birthdate"]').should("exist");
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
    cy.get('input[id="color"]').click();
    cy.get('.ant-select-item-option[title="green"]').click();
    cy.get('input[name="birthdate"]').clear().type("1990-01-01{enter}");
    cy.get('input[name="isStudent"]').check();

    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit").should("have.been.calledWith", {
      name: "John Doe",
      age: 25,
      email: "john@example.com",
      website: "https://example.com",
      color: "green",
      birthdate: new Date("1990-01-01"),
      isStudent: true,
    });
  });

  it("renders fields with default values", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        defaultValues={{
          name: "John Doe",
          age: 25,
          email: "john@example.com",
          website: "https://example.com",
          color: "green",
          birthdate: "1990-01-01" as unknown as Date,
          isStudent: true,
        }}
        withSubmit
      />
    );

    cy.get('button[type="submit"]').click();

    const defaults = {
      name: "John Doe",
      age: "25", // note: inputs always return strings
      email: "john@example.com",
      website: "https://example.com",
      birthdate: "1990-01-01",
      isStudent: true,
    };

    Object.entries(defaults).forEach(([field, val]) => {
      if (typeof val === "boolean") {
        cy.get(`[name="${field}"]`).should(
          val ? "be.checked" : "not.be.checked"
        );
      } else {
        cy.get(`[name="${field}"]`).should("have.value", val);
      }
    });

    cy.get(".ant-select-selection-item").should("have.text", "green");

    cy.get("@onSubmit").should("have.been.calledWith", {
      name: "John Doe",
      age: 25,
      email: "john@example.com",
      website: "https://example.com",
      color: "green",
      birthdate: new Date("1990-01-01"),
      isStudent: true,
    });
  });
});
