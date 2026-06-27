import React from "react";
import { fieldConfig, ZodProvider } from "@dual-autoform/zod";
import { z } from "zod/v3";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useFieldRHF } from "@dual-autoform/react/react-hook-form";
import { useFieldTanStack } from "@dual-autoform/react/tanstack-form";
import { autoFormAdapters, TestWrapper } from "./utils";

autoFormAdapters.forEach(({ name, AutoForm }) => {
  describe(`AutoForm Custom Fields Tests (MANTINE-ZOD), ${name}`, () => {
  const CustomField: React.FC<AutoFormFieldProps> = ({
    inputProps,
    error,
    id,
  }) => {
    const { field } =
      name === "react-hook-form"
        ? useFieldRHF({ name: id })
        : useFieldTanStack({ name: id });
    return (
      <div>
        <input
          id={id}
          type="text"
          className="custom-input"
          {...field}
          {...inputProps}
        />
        {error && <span className="error">{error}</span>}
      </div>
    );
  };

  const customSchema = z.object({
    customField: z
      .string()
      .min(5, "Must be at least 5 characters")
      .superRefine(
        fieldConfig({
          fieldType: "custom",
        }),
      ),
  });

  const schemaProvider = new ZodProvider(customSchema);

  it("renders and interacts with custom field components", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
          formComponents={{
            custom: CustomField,
          }}
        />
      </TestWrapper>,
    );

    cy.get(".custom-input").should("exist");
    cy.get(".custom-input").type("Hello");
    cy.get(".custom-input").should("have.value", "Hello");

    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit").should("have.been.calledWith", {
      customField: "Hello",
    });
  });

  it("shows validation errors for custom fields", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
          formComponents={{
            custom: CustomField,
          }}
        />
      </TestWrapper>,
    );

    cy.get(".custom-input").type("Hi");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("contain", "Must be at least 5 characters");
    cy.get("@onSubmit").should("not.have.been.called");
  });
});
});
