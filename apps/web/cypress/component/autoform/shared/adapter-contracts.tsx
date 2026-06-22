import React, { ComponentType } from "react";
import { createFormControl } from "react-hook-form";
import { formOptions, revalidateLogic } from "@tanstack/react-form";
import {
  useAppForm,
  useFieldContext,
  useFormContext,
} from "@acp-autoform/react/tanstack-form";
import { ZodProvider, fieldConfig } from "@acp-autoform/zod";
import { AutoFormFieldProps } from "@acp-autoform/react";
import { z } from "zod/v3";

const FragmentWrapper = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

type Wrapper = ComponentType<{ children: React.ReactNode }>;

const withWrapper = (WrapperComponent: Wrapper | undefined, children: React.ReactNode) => {
  const ResolvedWrapper = WrapperComponent ?? FragmentWrapper;
  return <ResolvedWrapper>{children}</ResolvedWrapper>;
};

export function defineTanStackFormPropertiesTests({
  label,
  AutoForm,
  Wrapper,
}: {
  label: string;
  AutoForm: ComponentType<any>;
  Wrapper?: Wrapper;
}) {
  const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.coerce.number().min(18, "Must be at least 18 years old"),
    website: z.string().url().optional(),
    probe: z
      .string()
      .optional()
      .superRefine(
        fieldConfig({
          fieldType: "probe",
        }),
      ),
  });

  const schemaProvider = new ZodProvider(schema);

  const TanStackFormProbe = (_props: AutoFormFieldProps) => {
    const form = useFormContext() as any;
    const [result, setResult] = React.useState({
      values: "initial",
      dirty: "initial",
      touched: "initial",
      reset: "initial",
      validate: "initial",
      setFieldValue: "initial",
      fieldContext: "initial",
      submitSuccessful: "initial",
    });
    const field = useFieldContext();

    return (
      <div>
        <form.Subscribe
          selector={(state: any) => ({
            isDirty: state.isDirty,
            isTouched: state.isTouched,
            isSubmitSuccessful: state.isSubmitSuccessful,
            values: state.values,
          })}
        >
          {(state: any) => (
            <output data-testid="tanstack-state">
              {JSON.stringify(state)}
            </output>
          )}
        </form.Subscribe>
        <button
          type="button"
          name="values"
          data-item={result.values}
          onClick={() =>
            setResult((prev) => ({
              ...prev,
              values: String(form.state.values.name === "John Doe"),
            }))
          }
        >
          values
        </button>
        <button
          type="button"
          name="dirty"
          data-item={result.dirty}
          onClick={() =>
            setResult((prev) => ({
              ...prev,
              dirty: String(form.state.isDirty),
            }))
          }
        >
          dirty
        </button>
        <button
          type="button"
          name="touched"
          data-item={result.touched}
          onClick={() =>
            setResult((prev) => ({
              ...prev,
              touched: String(form.state.isTouched),
            }))
          }
        >
          touched
        </button>
        <button
          type="button"
          name="setFieldValue"
          data-item={result.setFieldValue}
          onClick={() => {
            form.setFieldValue("name", "Jane Doe");
            form.setFieldValue("age", 32);
            setResult((prev) => ({
              ...prev,
              setFieldValue: String(
                form.state.values.name === "Jane Doe" &&
                  form.state.values.age === 32,
              ),
            }));
          }}
        >
          setFieldValue
        </button>
        <button
          type="button"
          name="fieldContext"
          data-item={result.fieldContext}
          onClick={() => {
            field.handleChange("field context value");
            setResult((prev) => ({
              ...prev,
              fieldContext: String(
                String(field.name) === "probe" &&
                  form.state.values.probe === "field context value",
              ),
            }));
          }}
        >
          fieldContext
        </button>
        <button
          type="button"
          name="validate"
          data-item={result.validate}
          onClick={async () => {
            const errors = await form.validate("submit");
            setResult((prev) => ({
              ...prev,
              validate: String(Object.keys(errors ?? {}).length === 0),
            }));
          }}
        >
          validate
        </button>
        <button
          type="button"
          name="reset"
          data-item={result.reset}
          onClick={() => {
            form.reset();
            setResult((prev) => ({
              ...prev,
              reset: String(form.state.values.name === undefined),
            }));
          }}
        >
          reset
        </button>
        <button
          type="button"
          name="submitSuccessful"
          data-item={result.submitSuccessful}
          onClick={() =>
            setResult((prev) => ({
              ...prev,
              submitSuccessful: String(form.state.isSubmitSuccessful),
            }))
          }
        >
          submitSuccessful
        </button>
      </div>
    );
  };

  describe(`TanStack form API properties Tests (${label})`, () => {
    it("checks the supported TanStack form instance contract", () => {
      cy.mount(
        withWrapper(
          Wrapper,
          <AutoForm
            schema={schemaProvider}
            onSubmit={cy.stub().as("onSubmit")}
            formComponents={{
              probe: TanStackFormProbe,
            }}
            defaultValues={{
              name: undefined,
              age: undefined,
            }}
            withSubmit
          />,
        ),
      );

      cy.get('button[name="values"]').should("exist");
      cy.get('[data-testid="tanstack-state"]').should("contain", "isDirty");

      cy.get('input[name="name"]').type("John Doe");
      cy.get('input[name="age"]').type("25").blur();
      cy.get('input[name="website"]').type("https://example.com").clear();

      cy.get('button[name="values"]')
        .click()
        .should("have.attr", "data-item", "true");
      cy.get('button[name="dirty"]')
        .click()
        .should("have.attr", "data-item", "true");
      cy.get('button[name="touched"]')
        .click()
        .should("have.attr", "data-item", "true");
      cy.get('button[name="validate"]')
        .click()
        .should("have.attr", "data-item", "true");

      cy.get('button[type="submit"]').click();
      cy.get('button[name="submitSuccessful"]')
        .click()
        .should("have.attr", "data-item", "true");
      cy.get("@onSubmit").should("have.been.calledWith", {
        name: "John Doe",
        age: 25,
        website: undefined,
      });

      cy.get('button[name="setFieldValue"]')
        .click()
        .should("have.attr", "data-item", "true");
      cy.get('input[name="name"]').should("have.value", "Jane Doe");
      cy.get('input[name="age"]').should("have.value", "32");

      cy.get('button[name="fieldContext"]')
        .click()
        .should("have.attr", "data-item", "true");
      cy.get('[data-testid="tanstack-state"]').should(
        "contain",
        "field context value",
      );

      cy.get('button[name="reset"]')
        .click()
        .should("have.attr", "data-item", "true");
      cy.get('input[name="name"]').should("have.value", "");
    });

    it("can disable empty-value replacement", () => {
      cy.mount(
        withWrapper(
          Wrapper,
          <AutoForm
            schema={schemaProvider}
            defaultValues={{
              name: "John Doe",
              age: 25,
              website: "",
            }}
            formProps={{ removeEmptyValue: false }}
            onSubmit={cy.stub().as("rawValueSubmit")}
            withSubmit
          />,
        ),
      );

      cy.get('button[type="submit"]').click();
      cy.get("@rawValueSubmit").should("not.have.been.called");
      cy.get('input[name="website"]').should(
        "have.attr",
        "aria-invalid",
        "true",
      );
    });
  });
}

export function defineExternalFormControlTests({
  label,
  RHFAutoForm,
  TanStackAutoForm,
  Wrapper,
}: {
  label: string;
  RHFAutoForm: ComponentType<any>;
  TanStackAutoForm: ComponentType<any>;
  Wrapper?: Wrapper;
}) {
  const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
  });

  const schemaProvider = new ZodProvider(schema);
  const initialValues = {
    name: "John Doe",
    email: "john@example.com",
  };
  const userValidationLogic = revalidateLogic({
    mode: "blur",
    modeAfterSubmission: "blur",
  });
  const userOnDynamic = () => undefined;
  const userOnSubmitInvalid = () => undefined;
  const userOnSubmit = () => undefined;

  function RHFExternalControlForm() {
    const { formControl, setValue, getValues } = React.useMemo(
      () =>
        createFormControl({
          defaultValues: initialValues,
        }),
      [],
    );
    const [snapshot, setSnapshot] = React.useState("");

    return withWrapper(
      Wrapper,
      <>
        <RHFAutoForm
          schema={schemaProvider}
          formControl={formControl}
          defaultValues={initialValues}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
        <button
          type="button"
          name="external-set"
          onClick={() => {
            setValue("name", "External Jane");
            setValue("email", "external@example.com");
          }}
        >
          external set
        </button>
        <button
          type="button"
          name="external-read"
          onClick={() => setSnapshot(JSON.stringify(getValues()))}
        >
          external read
        </button>
        <output data-testid="rhf-external-values">{snapshot}</output>
      </>,
    );
  }

  function TanStackExternalControlForm() {
    const form = useAppForm({
      defaultValues: initialValues,
    });
    const [snapshot, setSnapshot] = React.useState("");

    return withWrapper(
      Wrapper,
      <>
        <TanStackAutoForm
          schema={schemaProvider}
          formControl={form}
          defaultValues={initialValues}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
        <button
          type="button"
          name="external-set"
          onClick={() => {
            form.setFieldValue("name", "External Jane");
            form.setFieldValue("email", "external@example.com");
          }}
        >
          external set
        </button>
        <button
          type="button"
          name="external-read"
          onClick={() => setSnapshot(JSON.stringify(form.state.values))}
        >
          external read
        </button>
        <form.Subscribe selector={(state) => state.values}>
          {(values) => (
            <output data-testid="tanstack-live-values">
              {JSON.stringify(values)}
            </output>
          )}
        </form.Subscribe>
        <output data-testid="tanstack-external-values">{snapshot}</output>
      </>,
    );
  }

  function TanStackControlledValuesForm() {
    const [controlledValues, setControlledValues] =
      React.useState(initialValues);

    return withWrapper(
      Wrapper,
      <>
        <TanStackAutoForm
          schema={schemaProvider}
          defaultValues={initialValues}
          values={controlledValues}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
        <button
          type="button"
          name="controlled-set"
          onClick={() =>
            setControlledValues({
              name: "Controlled Jane",
              email: "controlled@example.com",
            })
          }
        >
          controlled set
        </button>
      </>,
    );
  }

  function TanStackExternalOptionsForm() {
    const form = useAppForm(
      formOptions({
        defaultValues: {
          name: "External default",
          email: "external-default@example.com",
        },
        validationLogic: userValidationLogic,
        validators: { onDynamic: userOnDynamic },
        onSubmit: userOnSubmit,
        onSubmitInvalid: userOnSubmitInvalid,
      }),
    );
    const [snapshot, setSnapshot] = React.useState("");

    return withWrapper(
      Wrapper,
      <>
        <TanStackAutoForm
          schema={schemaProvider}
          formControl={form}
          defaultValues={initialValues}
          onSubmit={cy.stub().as("autoFormSubmit")}
          withSubmit
        />
        <button
          type="button"
          name="read-options"
          onClick={() =>
            setSnapshot(
              JSON.stringify({
                validationLogicPreserved:
                  form.options.validationLogic === userValidationLogic,
                validatorPreserved:
                  form.options.validators?.onDynamic === userOnDynamic,
                invalidHandlerPreserved:
                  form.options.onSubmitInvalid === userOnSubmitInvalid,
                submitOwnedByAutoForm:
                  form.options.onSubmit !== userOnSubmit,
                defaultValuesOwnedByAutoForm:
                  form.options.defaultValues?.name === initialValues.name &&
                  form.options.defaultValues?.email === initialValues.email,
              }),
            )
          }
        >
          read options
        </button>
        <output data-testid="tanstack-option-ownership">{snapshot}</output>
      </>,
    );
  }

  describe(`External formControl Tests (${label})`, () => {
    it("keeps RHF external formControl and AutoForm inputs in sync", () => {
      cy.mount(<RHFExternalControlForm />);

      cy.get('input[name="name"]').should("have.value", "John Doe");
      cy.get('input[name="email"]').should("have.value", "john@example.com");

      cy.get('button[name="external-set"]').click();
      cy.get('input[name="name"]').should("have.value", "External Jane");
      cy.get('input[name="email"]').should("have.value", "external@example.com");

      cy.get('input[name="name"]').clear().type("Typed Jane");
      cy.get('input[name="email"]').clear().type("typed@example.com");
      cy.get('button[name="external-read"]').click();
      cy.get('[data-testid="rhf-external-values"]').should(
        "contain",
        "Typed Jane",
      );
      cy.get('[data-testid="rhf-external-values"]').should(
        "contain",
        "typed@example.com",
      );
    });

    it("keeps TanStack external formControl and AutoForm inputs in sync", () => {
      cy.mount(<TanStackExternalControlForm />);

      cy.get('input[name="name"]').should("have.value", "John Doe");
      cy.get('input[name="email"]').should("have.value", "john@example.com");
      cy.get('[data-testid="tanstack-live-values"]').should(
        "contain",
        "John Doe",
      );

      cy.get('button[name="external-set"]').click();
      cy.get('input[name="name"]').should("have.value", "External Jane");
      cy.get('input[name="email"]').should("have.value", "external@example.com");
      cy.get('[data-testid="tanstack-live-values"]').should(
        "contain",
        "External Jane",
      );

      cy.get('input[name="name"]').clear().type("Typed Jane");
      cy.get('input[name="email"]').clear().type("typed@example.com");
      cy.get('button[name="external-read"]').click();
      cy.get('[data-testid="tanstack-external-values"]').should(
        "contain",
        "Typed Jane",
      );
      cy.get('[data-testid="tanstack-external-values"]').should(
        "contain",
        "typed@example.com",
      );

      cy.get('button[type="submit"]').click();
      cy.get("@onSubmit").should("have.been.calledWith", {
        name: "Typed Jane",
        email: "typed@example.com",
      });
    });

    it("keeps TanStack controlled values and AutoForm inputs in sync", () => {
      cy.mount(<TanStackControlledValuesForm />);

      cy.get('input[name="name"]').should("have.value", "John Doe");
      cy.get('input[name="email"]').should("have.value", "john@example.com");

      cy.get('input[name="name"]').clear().type("User Typed");
      cy.get('button[name="controlled-set"]').click();

      cy.get('input[name="name"]').should("have.value", "Controlled Jane");
      cy.get('input[name="email"]').should(
        "have.value",
        "controlled@example.com",
      );
    });

    it("preserves user-owned TanStack options on an external formControl", () => {
      cy.mount(<TanStackExternalOptionsForm />);

      cy.get('input[name="name"]').should("have.value", "John Doe");
      cy.get('input[name="email"]').should("have.value", "john@example.com");
      cy.get('button[name="read-options"]').click();
      cy.get('[data-testid="tanstack-option-ownership"]').should(($output) => {
        expect(JSON.parse($output.text())).to.deep.equal({
          validationLogicPreserved: true,
          validatorPreserved: true,
          invalidHandlerPreserved: true,
          submitOwnedByAutoForm: true,
          defaultValuesOwnedByAutoForm: true,
        });
      });

      cy.get('button[type="submit"]').click();
      cy.get("@autoFormSubmit").should("have.been.calledWith", initialValues);
    });
  });
}
