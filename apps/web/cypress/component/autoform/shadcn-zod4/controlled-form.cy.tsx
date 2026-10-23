import React, { useEffect, useMemo, useState } from "react";
import { AutoForm } from "@autoform/shadcn/components/ui/autoform/react-hook-form";
import { createFormControl, type Resolver } from "react-hook-form";
import { ZodProvider } from "@autoform/zod";
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

const minLengthResolver: Resolver<{ name: string }> = async (values) =>
  values.name?.length >= 5
    ? { values, errors: {} }
    : {
        values: {},
        errors: {
          name: { type: "minLength", message: "Custom resolver: min 5" },
        },
      };

const CustomResolverForm = () => {
  const schemaProvider = new ZodProvider(z.object({ name: z.string() }));
  const { formControl } = useMemo(
    () =>
      createFormControl({ mode: "onChange", resolver: minLengthResolver }),
    [],
  );

  return (
    <TestWrapper>
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
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

  it("uses the options passed to createFormControl", () => {
    cy.mount(<CustomResolverForm />);

    cy.get('input[name="name"]').type("abc");
    // mode "onChange": the resolver runs while typing, before any submit
    cy.contains("Custom resolver: min 5").should("be.visible");
    cy.get('button[type="submit"]').click();
    cy.contains("Custom resolver: min 5").should("be.visible");
    cy.get("@onSubmit").should("not.have.been.called");

    cy.get('input[name="name"]').clear().type("abcde");
    cy.get('button[type="submit"]').click();
    cy.get("@onSubmit").should("have.been.calledOnce");
  });
});
