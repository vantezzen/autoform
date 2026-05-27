import React from "react";
import { AutoForm } from "@autoform/mui";
import { ZodProvider } from "@autoform/zod";
import { z } from "zod/v3";

describe("AutoForm Validation Tests (MUI-ZOD)", () => {
  const validationSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    email: z.string().email("Invalid email address"),
  });

  const schemaProvider = new ZodProvider(validationSchema);

  it("shows validation errors when submitting invalid data", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />,
    );

    cy.get('input[name="username"]').type("ab");
    cy.get('input[name="password"]').type("1234567");
    cy.get('input[name="email"]').type("invalid");

    cy.get('button[type="submit"]').click();

    cy.contains("Username must be at least 3 characters").should("be.visible");
    cy.contains("Password must be at least 8 characters").should("be.visible");
    cy.contains("Invalid email address").should("be.visible");

    cy.get("@onSubmit").should("not.have.been.called");
  });

  it("does not show errors for valid data", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />,
    );

    cy.get('input[name="username"]').type("johndoe");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="email"]').type("john@example.com");

    cy.get('button[type="submit"]').click();

    cy.contains("Username must be at least 3 characters").should("not.exist");
    cy.contains("Password must be at least 8 characters").should("not.exist");
    cy.contains("Invalid email address").should("not.exist");

    cy.get("@onSubmit").should("have.been.calledOnce");
  });

  it("focus fields on error", () => {
    const onSubmit = cy.stub().as("onSubmit");

    const basicSchema = z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      age: z.coerce.number().min(18, "Must be at least 18 years old"),
      isStudent: z.boolean({ message: "are you a student?" }),
      birthdate: z.coerce.date(),
      color: z.enum(["red", "green", "blue"], {
        required_error: "Color is required",
      }),
      address: z.object({
        city: z.string().min(2, "City name must be at least 2 characters"),
      }),
    });
    const newSchemaProvider = new ZodProvider(basicSchema);

    cy.mount(
      <AutoForm schema={newSchemaProvider} onSubmit={onSubmit} withSubmit />,
    );

    cy.get('input[name="name"]').type("J");
    cy.get('input[name="age"]').type("1");
    cy.get('input[name="address.city"]').type("j");

    // string field
    cy.get('button[type="submit"]').click();
    cy.contains("Name must be at least 2 characters").should("be.visible");
    cy.get('input[name="name"]').should("be.focused");
    cy.get('input[name="name"]').clear().type("John Doe");

    // number field
    cy.get('button[type="submit"]').click();
    cy.contains("Must be at least 18 years old").should("be.visible");
    cy.get('input[name="age"]').should("be.focused");
    cy.get('input[name="age"]').clear().type("25");

    // boolean field
    cy.get('button[type="submit"]').click();
    cy.get('input[name="isStudent"]').should("be.focused");
    cy.get('input[name="isStudent"]').check();

    // date field
    cy.get('button[type="submit"]').click();
    cy.contains("Invalid date").should("be.visible");
    cy.get('input[name="birthdate"]').should("be.focused");
    cy.get('input[name="birthdate"]').type("1990-01-01");

    // select field
    cy.get('button[type="submit"]').click();
    cy.contains("Color is required").should("be.visible");
    cy.get("#mui-component-select-color").click();
    cy.get('.MuiMenuItem-root[data-value="green"]').click();

    // sub-object focus
    cy.get('button[type="submit"]').click();
    cy.contains("City name must be at least 2 characters").should("be.visible");
    cy.get('input[name="address.city"]').should("be.focused");
    cy.get('input[name="address.city"]').clear().type("John Doe");

    cy.get('button[type="submit"]').click();
    cy.get("@onSubmit").should("have.been.called");
  });
});
