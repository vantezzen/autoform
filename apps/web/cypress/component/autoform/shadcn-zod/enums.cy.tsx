import React from "react";
import { AutoForm } from "@autoform/shadcn/components/ui/autoform/AutoForm";
import { ZodProvider } from "@autoform/zod";
import { z } from "zod";
import { TestWrapper } from "./utils";

describe("AutoForm Enums Tests (SHADCN-ZOD)", () => {
  const arraySchema = z.object({
    gender: z.enum(["male", "female"]),
  });
  const schemaProvider = new ZodProvider(arraySchema);

  const arraySchemaWithDefault = z.object({
    gender: z.enum(["male", "female"]).default("male"),
  });
  const schemaProviderWithDefault = new ZodProvider(arraySchemaWithDefault);

  it("renders enums fields correctly", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>
    );

    // Check if select trigger exists
    cy.get('[role="combobox"]').should("exist");

    // Open the select dropdown
    cy.get('[role="combobox"]').click();

    // Verify options are rendered correctly
    cy.get('[role="option"]').should("have.length", 2);
    cy.get('[role="option"]').eq(0).should("have.text", "male");
    cy.get('[role="option"]').eq(1).should("have.text", "female");

    // Test form submission with selected value
    cy.get('[role="option"]').contains("female").click();
    cy.get("form").submit();
    cy.get("@onSubmit").should("have.been.calledWith", {
      gender: "female",
    });
  });

  it("handles default values for enums correctly", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProviderWithDefault}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>
    );

    // Verify default value is selected
    cy.get('[role="combobox"]').should("contain.text", "male");

    // Submit form without changes to verify default value
    cy.get("form").submit();
    cy.get("@onSubmit").should("have.been.calledWith", {
      gender: "male",
    });
  });
});
