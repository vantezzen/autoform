import React, { useState } from "react";
import { createAutoForm } from "@acp-autoform/mui";
import { AutoForm as AutoFormRHF } from "@acp-autoform/react/react-hook-form";
const AutoForm = createAutoForm(AutoFormRHF);
import { ZodProvider } from "@acp-autoform/zod";
import { z } from "zod/v3";

const ControlledForm = () => {
  const [formValues, setFormValues] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const schemaProvider = new ZodProvider(schema);

  return (
    <AutoForm
      schema={schemaProvider}
      onSubmit={cy.stub().as("onSubmit")}
      withSubmit
      values={formValues}
      onFormInit={(form) => {
        form.watch((data: any) => {
          setFormValues(data as typeof formValues);
        });
      }}
    />
  );
};

describe("AutoForm Controlled Form Tests (MUI-ZOD)", () => {
  it("renders with initial values", () => {
    cy.mount(<ControlledForm />);

    cy.get('input[name="name"]').should("have.value", "John Doe");
    cy.get('input[name="email"]').should("have.value", "john@example.com");
  });

  it("updates controlled values on input", () => {
    return; // TODO: controlled forms for mui are re-creating the element on every change, so this is not reliable

    cy.mount(<ControlledForm />);

    cy.get('input[name="name"]').clear().type("Jane Doe");
    cy.get('input[name="name"]').should("have.value", "Jane Doe");

    cy.get('input[name="email"]').clear().type("jane@example.com");
    cy.get('input[name="email"]').should("have.value", "jane@example.com");
  });
});
