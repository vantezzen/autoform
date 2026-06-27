import React, { ComponentType, useState } from "react";
import { autoFormAdapters } from "./utils";
import { ZodProvider } from "@dual-autoform/zod";
import { z } from "zod/v3";

const ControlledForm = ({ AutoForm }: { AutoForm: ComponentType<any> }) => {
  const [formValues] = useState({
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
    />
  );
};

autoFormAdapters.forEach(({ name, AutoForm }) => {
  describe(`AutoForm Controlled Form Tests (MUI-ZOD), ${name}`, () => {
  it("renders with initial values", () => {
    cy.mount(<ControlledForm AutoForm={AutoForm} />);

    cy.get('input[name="name"]').should("have.value", "John Doe");
    cy.get('input[name="email"]').should("have.value", "john@example.com");
  });

  it("updates controlled values on input", () => {
    cy.mount(<ControlledForm AutoForm={AutoForm} />);

    cy.get('input[name="name"]').clear().type("Jane Doe");
    cy.get('input[name="name"]').should("have.value", "Jane Doe");

    cy.get('input[name="email"]').clear().type("jane@example.com");
    cy.get('input[name="email"]').should("have.value", "jane@example.com");
  });
});
});
