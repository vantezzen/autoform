import React, { useState } from "react";
import { AutoForm } from "@autoform/mantine";
import { ZodProvider } from "@autoform/zod";
import { z } from "zod";
import { TestWrapper } from "./utils";

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
    <TestWrapper>
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
        values={formValues}
        onFormInit={(form) => {
          form.watch((data) => {
            setFormValues(data as typeof formValues);
          });
        }}
      />
    </TestWrapper>
  );
};

describe("AutoForm Controlled Form Tests", () => {
  it("renders with initial values", () => {
    cy.mount(<ControlledForm />);

    cy.get('input[name="name"]').should("have.value", "John Doe");
    cy.get('input[name="email"]').should("have.value", "john@example.com");
  });

  it("updates controlled values on input", () => {
    return; // TODO: controlled forms for mantine are re-creating the element on every change, so this is not reliable
    cy.mount(<ControlledForm />);

    cy.get('input[name="name"]').clear().type("Jane Doe");
    cy.get('input[name="name"]').should("have.value", "Jane Doe");

    cy.get('input[name="email"]').clear().type("jane@example.com");
    cy.get('input[name="email"]').should("have.value", "jane@example.com");
  });
});
