import React from "react";
import { ZodProvider, fieldConfig } from "@acp-autoform/zod";
import { z } from "zod/v3";
import { TextField } from "@mui/material";
import { autoFormAdapters, TestWrapper } from "./utils";
import {
  ArrayElementWrapperProps,
  ArrayWrapperProps,
  FieldWrapperProps,
  ObjectWrapperProps,
} from "@acp-autoform/react";

autoFormAdapters.forEach(({ name, AutoForm }) => {
  describe(`AutoForm UI Customization Tests (SHADCN-ZOD, ${name})`, () => {
  const customSchema = z.object({
    name: z.string().superRefine(
      fieldConfig({
        fieldWrapper: ({ label, children }: FieldWrapperProps) => (
          <div className="custom-wrapper">
            <label className="custom-label">{label}</label>
            {children}
          </div>
        ),
      }),
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
      </TestWrapper>,
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
      </TestWrapper>,
    );

    cy.get(".override-wrapper").should("exist");
    cy.get(".override-label").first().should("contain", "Email");
  });

  it("uses fieldConfig structural wrappers before global UI wrappers", () => {
    const wrapperSchema = z.object({
      profile: z
        .object({
          displayName: z.string(),
        })
        .superRefine(
          fieldConfig({
            objectWrapper: ({ label, children }: ObjectWrapperProps) => (
              <section className="field-config-object-wrapper">
                <h2>{label}</h2>
                {children}
              </section>
            ),
          }),
        ),
      addresses: z
        .array(
          z.object({
            city: z.string(),
          }),
        )
        .superRefine(
          fieldConfig({
            arrayWrapper: ({
              label,
              children,
              onAddItem,
            }: ArrayWrapperProps) => (
              <section className="field-config-array-wrapper">
                <h2>{label}</h2>
                {children}
                <button type="button" onClick={onAddItem}>
                  Add address
                </button>
              </section>
            ),
            arrayElementWrapper: ({
              children,
              index,
              onRemove,
            }: ArrayElementWrapperProps) => (
              <div className="field-config-array-element-wrapper">
                <span>Address {index + 1}</span>
                {children}
                <button type="button" onClick={onRemove}>
                  Remove address
                </button>
              </div>
            ),
          }),
        ),
    });

    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={new ZodProvider(wrapperSchema)}
          uiComponents={{
            ObjectWrapper: ({ children }) => (
              <section className="global-object-wrapper">{children}</section>
            ),
            ArrayWrapper: ({ children, onAddItem }) => (
              <section className="global-array-wrapper">
                {children}
                <button type="button" onClick={onAddItem}>
                  Add global item
                </button>
              </section>
            ),
            ArrayElementWrapper: ({ children, onRemove }) => (
              <div className="global-array-element-wrapper">
                {children}
                <button type="button" onClick={onRemove}>
                  Remove global item
                </button>
              </div>
            ),
          }}
        />
      </TestWrapper>,
    );

    cy.get(".field-config-object-wrapper").should("contain", "Profile");
    cy.get(".field-config-array-wrapper").should("contain", "Addresses");
    cy.contains("button", "Add address").click();
    cy.get(".field-config-array-element-wrapper").should(
      "contain",
      "Address 1",
    );
    cy.get(".global-object-wrapper").should("not.contain", "Profile");
    cy.get(".global-array-wrapper").should("not.exist");
    cy.get(".global-array-element-wrapper").should("not.exist");
  });

  it("uses custom form components", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
          formComponents={{
            string: ({ inputProps }) => (
              <TextField
                {...inputProps}
                variant="outlined"
                className="custom-text-field"
              />
            ),
          }}
        />
      </TestWrapper>,
    );

    cy.get(".custom-text-field").should("exist");
  });
});
});
