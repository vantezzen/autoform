import React from "react";
import { AutoForm } from "@autoform/ant";
import { ZodProvider, fieldConfig } from "@autoform/zod";
import { z } from "zod/v3";

describe("AutoForm Advanced Features Tests (ANT-ZOD)", () => {
  const advancedSchema = z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .superRefine(
        fieldConfig({
          description: "Choose a unique username",
          order: 1,
          inputProps: {
            placeholder: "Enter username",
          },
        }),
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .describe("Create a password")
      .superRefine(
        fieldConfig({
          description: "Use a strong password",
          order: 2,
          inputProps: {
            type: "password",
          },
        }),
      ),
    favoriteColor: z.enum(["red", "green", "blue"]).superRefine(
      fieldConfig({
        fieldType: "select",
        order: 3,
        label: "Your favourite color",
        inputProps: {
          placeholder: "select one color",
        },
      }),
    ),
    bio: z
      .string()
      .optional()
      .superRefine(
        fieldConfig({
          order: 4,
        }),
      ),
  });

  const schemaProvider = new ZodProvider(advancedSchema);

  it("renders fields in the correct order", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />,
    );

    cy.get(".ant-form-item")
      .eq(0)
      .find("input")
      .should("have.attr", "name", "username");
    cy.get(".ant-form-item")
      .eq(1)
      .find("input")
      .should("have.attr", "name", "password");
    cy.get(".ant-form-item")
      .eq(2)
      .find(".ant-select")
      .find(".ant-select-selection-search-input");
    cy.get(".ant-form-item")
      .eq(3)
      .find("input")
      .should("have.attr", "name", "bio");
  });

  it("displays field descriptions", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />,
    );

    cy.contains("Choose a unique username").should("be.visible");
    cy.contains("Use a strong password").should("be.visible");
  });

  it("displays field labels", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />,
    );

    cy.contains("Create a password").should("be.visible");
    cy.contains("Your favourite color").should("be.visible");
  });

  it("applies custom input props", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />,
    );

    cy.get('input[name="username"]').should(
      "have.attr",
      "placeholder",
      "Enter username",
    );
    cy.contains("select one color").should("be.visible");
    cy.get('input[name="password"]').should("have.attr", "type", "password");
  });

  it("renders select field correctly", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />,
    );

    cy.get('.ant-select[name*="favoriteColor"]')
      .should("exist")
      .click()
      .find("input#favoriteColor")
      .click();
    cy.get('.ant-select-item[title="red"]').should("exist");
    cy.get('.ant-select-item[title="green"]').should("exist");
    cy.get('.ant-select-item[title="blue"]').should("exist");
  });

  it("renders textarea field correctly", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />,
    );

    cy.get('input[name="bio"]').should("exist");
  });

  it("applies disabled input prop", () => {
    const disableSchema = z.object({
      name: z.string().superRefine(
        fieldConfig({
          inputProps: {
            disabled: true,
          },
        }),
      ),
      age: z.coerce.number().superRefine(
        fieldConfig({
          inputProps: {
            disabled: true,
          },
        }),
      ),
      color: z.enum(["red", "green", "blue"]).superRefine(
        fieldConfig({
          inputProps: {
            disabled: true,
          },
        }),
      ),
      birthdate: z.coerce.date().superRefine(
        fieldConfig({
          inputProps: {
            disabled: true,
          },
        }),
      ),
      isStudent: z.boolean().superRefine(
        fieldConfig({
          inputProps: {
            disabled: true,
          },
        }),
      ),
    });
    const newSchemaProvider = new ZodProvider(disableSchema);

    cy.mount(
      <AutoForm
        schema={newSchemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />,
    );

    cy.get('input[name="name"]').should("be.disabled");
    cy.get('input[name="age"]').should("be.disabled");
    cy.get(".ant-select-disabled").should("exist");
    cy.get('input[name="birthdate"]').should("be.disabled");
    cy.get('input[name="isStudent"]').should("be.disabled");
  });
});
