import React from "react";
import { AutoForm } from "@autoform/mantine";
import { ZodProvider, fieldConfig } from "@autoform/zod";
import { z } from "zod";
import { TestWrapper } from "./utils";

describe("AutoForm Advanced Features Tests", () => {
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
        })
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .superRefine(
        fieldConfig({
          description: "Use a strong password",
          order: 2,
          inputProps: {
            type: "password",
          },
        })
      ),
    favoriteColor: z.enum(["red", "green", "blue"]).superRefine(
      fieldConfig({
        fieldType: "select",
        order: 3,
      })
    ),
    bio: z
      .string()
      .optional()
      .superRefine(
        fieldConfig({
          order: 4,
        })
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
      </TestWrapper>
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
      </TestWrapper>
    );

    cy.contains("Choose a unique username").should("be.visible");
    cy.contains("Use a strong password").should("be.visible");
  });

  it("applies custom input props", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>
    );

    cy.get('input[name="username"]').should(
      "have.attr",
      "placeholder",
      "Enter username"
    );
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
      </TestWrapper>
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
      </TestWrapper>
    );

    cy.get('input[name="bio"]').should("exist");
  });
});
