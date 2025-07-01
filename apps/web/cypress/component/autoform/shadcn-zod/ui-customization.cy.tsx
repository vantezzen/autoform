import React from "react";
import { AutoForm } from "@autoform/shadcn/components/ui/autoform/AutoForm";
import { ZodProvider, fieldConfig } from "@autoform/zod";
import { z } from "zod";
import { TextField } from "@mui/material";
import { TestWrapper } from "./utils";
import { FieldWrapperProps } from "@autoform/react";

describe("AutoForm UI Customization Tests (SHADCN-ZOD)", () => {
  const customSchema = z.object({
    name: z.string().superRefine(
      fieldConfig({
        fieldWrapper: ({ label, children }: FieldWrapperProps) => (
          <div className="custom-wrapper">
            <label className="custom-label">{label}</label>
            {children}
          </div>
        ),
      })
    ),
    email: z.string().email(),
  });

  const schemaProvider = new ZodProvider(customSchema);

  it("renders custom field wrapper", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>
    );

    cy.get(".custom-wrapper").should("exist");
    cy.get(".custom-label").should("contain", "Name");
  });

  it("overrides UI components", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
          uiComponents={{
            FieldWrapper: ({ label, children }) => (
              <div className="override-wrapper">
                <span className="override-label">{label}</span>
                {children}
              </div>
            ),
          }}
        />
      </TestWrapper>
    );

    cy.get(".override-wrapper").should("exist");
    cy.get(".override-label").first().should("contain", "Email");
  });

  it("uses custom form components", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
          formComponents={{
            string: ({ field, inputProps }) => (
              <TextField
                {...inputProps}
                variant="outlined"
                className="custom-text-field"
              />
            ),
          }}
        />
      </TestWrapper>
    );

    cy.get(".custom-text-field").should("exist");
  });
});
