import React, { useEffect, useMemo, useState } from "react";
import { AutoForm } from "@dual-autoform/shadcn/components/ui/autoform/react-hook-form";
import { createFormControl } from "react-hook-form";
import { ZodProvider } from "@dual-autoform/zod";
import { z } from "zod/v4";
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
  const { formControl, subscribe } = useMemo(
    () => createFormControl<typeof formValues>(),
    [],
  );

  useEffect(() => {
    const unsubscribe = subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        setFormValues(values as typeof formValues);
      },
    });

    return unsubscribe;
  }, [subscribe]);

  return (
    <TestWrapper>
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
        values={formValues}
        formControl={formControl}
      />
    </TestWrapper>
  );
};

describe("AutoForm Controlled Form Tests (SHADCN-ZOD-V4)", () => {
  it("renders with initial values", () => {
    cy.mount(<ControlledForm />);

    cy.get('input[name="name"]').should("have.value", "John Doe");
    cy.get('input[name="email"]').should("have.value", "john@example.com");
  });

  it("updates controlled values on input", () => {
    cy.mount(<ControlledForm />);

    cy.get('input[name="name"]').clear().type("Jane Doe");
    cy.get('input[name="name"]').should("have.value", "Jane Doe");

    cy.get('input[name="email"]').clear().type("jane@example.com");
    cy.get('input[name="email"]').should("have.value", "jane@example.com");
  });
});
