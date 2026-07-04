import React from "react";
import { fieldConfig, ZodProvider } from "@dual-autoform/zod";
import { AutoForm } from "@dual-autoform/mantine/react-hook-form";
import HookTest from "@web/components/Hook-test";
import { TestWrapper } from "./utils";
import { z } from "zod/v3";

describe("React-Hook-Form useForm properties Tests (MANTINE-ZOD)", () => {
  const fieldSchema = z.object({
    name: z
      .string({ message: "required" })
      .min(2, "Name must be at least 2 characters"),
    age: z.coerce.number().min(18, "Must be at least 18 years old"),
    color: z.enum(["red", "green", "blue"]),
    birthdate: z.coerce.date(),
    isStudent: z.boolean(),
    test: z
      .string()
      .optional()
      .superRefine(
        fieldConfig({
          fieldType: "custom",
        }),
      ),
  });
  const schemaProvider = new ZodProvider(fieldSchema);

  const TestForm = () => {
    return (
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        formComponents={{
          custom: HookTest,
        }}
        defaultValues={{
          name: undefined,
          age: undefined,
          color: undefined,
          birthdate: undefined,
          isStudent: false,
        }}
        withSubmit
      />
    );
  };

  it("checks useForm properties", () => {
    cy.mount(
      <TestWrapper>
        <TestForm />
      </TestWrapper>,
    );

    // Wait for form to render
    cy.get('button[name="dirtyFields"]').should("exist");

    // FORMSTATE BEFORE CHANGES.
    cy.get('button[name="dirtyFields"]')
      .click()
      .should("have.attr", "data-item", "false");
    cy.get('button[name="touchedFields"]')
      .click()
      .should("have.attr", "data-item", "false");
    cy.get('button[name="isValid"]')
      .click()
      .should("have.attr", "data-item", "false");
    cy.get('button[name="isSubmitSuccessful"]')
      .click()
      .should("have.attr", "data-item", "false");

    // ENTER VALUES
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="age"]').type("25");
    cy.get('input[name="isStudent"]').check();
    cy.get('[data-dates-input="true"]').clear().type("1990-01-01{enter}");
    cy.get(".mantine-Select-input").eq(0).click();
    cy.get('.mantine-Select-option[value="green"]')
      .should("exist")
      .and("be.visible")
      .click();

    // CHECK FORMSTATE
    cy.get('button[name="dirtyFields"]')
      .click()
      .should("have.attr", "data-item", "true");
    cy.get('button[name="touchedFields"]')
      .click()
      .should("have.attr", "data-item", "true");
    cy.get('button[name="isValid"]')
      .click()
      .should("have.attr", "data-item", "true");
    cy.get('button[type="submit"]').click();
    cy.get('button[name="isSubmitSuccessful"]')
      .click()
      .should("have.attr", "data-item", "true");

    cy.get("@onSubmit").should("have.been.called");
    cy.get("@onSubmit").should("have.been.calledWith", {
      name: "John Doe",
      age: 25,
      color: "green",
      birthdate: new Date("1990-01-01"),
      isStudent: true,
    });

    // CHECK WATCH
    cy.get('button[name="watch"]')
      .click()
      .should("have.attr", "data-item", "true");

    // CHECK RESET  // named as clear due to an error
    cy.get('button[name="clear"]')
      .click()
      .should("have.attr", "data-item", "true");

    // CHECK TRIGGER - empty fields
    cy.get('button[name="trigger"]')
      .click()
      .should("have.attr", "data-item", "false");

    // CHECK SETVALUE
    cy.get('button[name="setValue"]')
      .click()
      .should("have.attr", "data-item", "true");

    // CHECK TRIGGER - filled values
    cy.get('button[name="trigger"]')
      .click()
      .should("have.attr", "data-item", "true");
  });
});
