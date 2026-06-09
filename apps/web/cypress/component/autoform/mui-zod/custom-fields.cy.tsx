import { useController } from "react-hook-form";
import React from "react";
import { AutoForm } from "@acp-autoform/mui";
import { fieldConfig, ZodProvider } from "@acp-autoform/zod";
import { z } from "zod/v3";
import { AutoFormFieldProps } from "@acp-autoform/react";

describe("AutoForm Custom Fields Tests (MUI-ZOD)", () => {
  const CustomField: React.FC<AutoFormFieldProps> = ({
    inputProps,
    error,
    id,
  }) => {
    const formField = useController({ name: id }).field;
    return (
      <div>
        <input
          id={id}
          type="text"
          className="custom-input"
          {...inputProps}
          {...formField}
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
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
        formComponents={{
          custom: CustomField,
        }}
      />,
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
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
        formComponents={{
          custom: CustomField,
        }}
      />,
    );

    cy.get(".custom-input").type("Hi");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("contain", "Must be at least 5 characters");
    cy.get("@onSubmit").should("not.have.been.called");
  });
});
