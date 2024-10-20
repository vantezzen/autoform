import React from "react";
import { AutoForm } from "@autoform/mui";
import { YupProvider } from "@autoform/yup";
import * as Yup from "yup";

describe("AutoForm Validation Tests", () => {
  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Username must be at least 3 characters"),
    password: Yup.string().min(8, "Password must be at least 8 characters"),
    email: Yup.string().email("Invalid email address"),
  });

  const schemaProvider = new YupProvider(validationSchema);

  it("shows validation errors when submitting invalid data", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />
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
      />
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
});
