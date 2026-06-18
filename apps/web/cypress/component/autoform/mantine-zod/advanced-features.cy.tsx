import React from "react";
import { ZodProvider, fieldConfig } from "@acp-autoform/zod";
import { z } from "zod/v3";
import { autoFormAdapters, TestWrapper } from "./utils";

autoFormAdapters.forEach(({ name, AutoForm }) => {
  describe(`AutoForm Advanced Features Tests (MANTINE-ZOD), ${name}`, () => {
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
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>,
    );

    cy.get(".mantine-InputWrapper-root")
      .eq(0)
      .find("input")
      .should("have.attr", "name", "username");
    cy.get(".mantine-InputWrapper-root")
      .eq(1)
      .find("input")
      .should("have.attr", "name", "password");
    cy.get(".mantine-InputWrapper-root")
      .eq(2)
      .find(".mantine-Select-wrapper")
      .find("input");
    cy.get(".mantine-InputWrapper-root")
      .eq(3)
      .find("input")
      .should("have.attr", "name", "bio");
  });

  it("displays field descriptions", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>,
    );

    cy.contains("Choose a unique username").should("be.visible");
    cy.contains("Use a strong password").should("be.visible");
  });

  it("displays field labels", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>,
    );

    cy.contains("Create a password").should("be.visible");
    cy.contains("Your favourite color").should("be.visible");
  });

  it("applies custom input props", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>,
    );

    cy.get('input[name="username"]').should(
      "have.attr",
      "placeholder",
      "Enter username",
    );
    cy.get('input[placeholder="select one color"]').should("exist");
    cy.get('input[name="password"]').should("have.attr", "type", "password");
  });

  it("renders select field correctly", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>,
    );

    cy.get(".mantine-Select-input").eq(0).click();

    cy.get(".mantine-Popover-dropdown").within(() => {
      cy.contains("red").should("exist");
      cy.contains("green").should("exist");
      cy.contains("blue").should("exist");
    });
    // mantine select fields portal has auto-generated aria-label and names.
  });

  it("renders textarea field correctly", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>,
    );

    cy.get('input[name="bio"]').should("exist");
  });

  it("applies disabled input prop", () => {
    const newSchema = z.object({
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
    const newSchemaProvider = new ZodProvider(newSchema);

    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={newSchemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>,
    );

    cy.get('input[name="name"]').should("be.disabled");
    cy.get('input[name="age"]').should("be.disabled");
    cy.get(".mantine-Select-input").eq(0).should("be.disabled");
    cy.get('input.mantine-DateInput-input[data-disabled="true"]').should(
      "be.disabled",
    );
    cy.get('input[name="isStudent"]').should("be.disabled");
  });
});
});
