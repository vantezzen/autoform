# Form Control Reference

AutoForm provides several ways to access form data, check validation state, and trigger form actions (like submit and reset). Use the control API for the adapter you selected: React Hook Form for `/react-hook-form`, or TanStack Form for `/tanstack-form`.

## 1. onSubmit (The Simplest Way)

When you only need the data after a successful submission, pass an `onSubmit` handler to `AutoForm`. AutoForm will validate and coerce the data before calling your function.

```tsx
<AutoForm
  schema={schemaProvider}
  onSubmit={(data, form, event) => {
    // data is strongly typed based on your schema
    console.log("Validated data:", data);

    // form is the react-hook-form instance (UseFormReturn)
    form.reset();
  }}
  withSubmit // Adds the default submit button
/>
```

## 2. Using useFormContext (Inside AutoForm)

AutoForm automatically wraps your form with React Hook Form's `<FormProvider>`. This means any component rendered **inside** the `<AutoForm>` tags (as a child) can use the `useFormContext` hook to access the form instance.

This is ideal for adding custom buttons, displaying real-time validation state, or triggering conditional logic based on form values.

```tsx
import { useFormContext } from "react-hook-form";
import { AutoForm } from "@dual-autoform/mui/react-hook-form";

function FormActions() {
  const {
    watch,
    setValue,
    reset,
    formState: { isValid, isSubmitting },
  } = useFormContext();

  const email = watch("email");

  return (
    <div className="mt-4 flex gap-2 items-center">
      <button
        type="button"
        onClick={() =>
          setValue("email", "test@example.com", { shouldValidate: true })
        }
      >
        Fill Test Email
      </button>

      <button type="button" onClick={() => reset()}>
        Reset Form
      </button>

      <span className="text-sm">Current email: {email || "none"}</span>

      {/* Disable submit if form is invalid */}
      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}

export default function MyForm({ schemaProvider }) {
  return (
    <AutoForm schema={schemaProvider}>
      {/* FormActions is a child of AutoForm, so useFormContext works here */}
      <FormActions />
    </AutoForm>
  );
}
```

> **Note on real-time validation (`isValid`)**: By default, React Hook Form only validates on submit. If you want `isValid` to update as the user types, you must use an external form control (see method 3) and set `mode: "all"`.

## 3. Using createFormControl (Outside AutoForm)

When you need to access form state or trigger actions from **outside** the `<AutoForm>` component (for example, from a Dialog footer button, a parent component, or to change the validation mode), use `createFormControl` from `react-hook-form`.

`createFormControl` creates a persistent form controller that you pass into AutoForm.

> **Requirement**: `createFormControl` requires `react-hook-form` version `7.55.0` or later.

```tsx
import * as React from "react";
import { createFormControl } from "react-hook-form";
import { AutoForm } from "@dual-autoform/mui/react-hook-form";
// ... import schemaProvider

export default function MyForm() {
  // Create the control ONCE using useMemo.
  // You can pass any standard useForm options here (like mode, defaultValues).
  const {
    formControl,
    handleSubmit,
    reset,
    formState: { isValid },
  } = React.useMemo(
    () =>
      createFormControl({
        mode: "all", // Validates on every change (enables real-time isValid)
      }),
    [],
  );

  const onSubmit = (data) => {
    console.log("Validated data:", data);
  };

  return (
    <div className="border p-6 rounded-lg">
      <AutoForm
        schema={schemaProvider}
        formControl={formControl}
        // onSubmit works here, OR you can use handleSubmit on your buttons
        onSubmit={onSubmit}
      />

      {/* These buttons are completely OUTSIDE the AutoForm component */}
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
```

## 4. Controlled Forms (`values` vs `defaultValues`)

AutoForm supports controlled and uncontrolled approaches for initial data.

**`defaultValues` (Uncontrolled)**
Use `defaultValues` to populate the form initially. The user can clear or change these values, and they won't revert unless you explicitly call `reset()`.

```tsx
<AutoForm
  schema={schemaProvider}
  defaultValues={{ email: "user@example.com" }}
/>
```

**`values` (Controlled)**
Use `values` when the form needs to strictly reflect an external state object. If the external state changes, the form will update to match it.

```tsx
const [user, setUser] = useState({ email: "user@example.com" });

// If `user` state changes later, the form updates automatically
<AutoForm schema={schemaProvider} values={user} />;
```

## 5. TanStack Form adapter

For TanStack Form, import control hooks from `@dual-autoform/react/tanstack-form`:

```tsx
import { formOptions } from "@tanstack/react-form";
import {
  useAppForm,
  useFieldContext,
  useFormContext,
} from "@dual-autoform/react/tanstack-form";
```

Use `useFormContext()` inside AutoForm children to read or submit the current TanStack form. Use `useFieldContext()` inside custom field components to bind the current field value.

For controls outside AutoForm, create the form once and pass it through `formControl`:

```tsx
const options = React.useMemo(() => formOptions(), []);
const form = useAppForm(options);

<AutoForm
  schema={schemaProvider}
  formControl={form}
  defaultValues={{ username: "" }}
/>;
<button type="button" onClick={() => void form.handleSubmit()}>
  Submit
</button>;
```

Keep `formOptions(...)` stable. Define static options at module scope, or memoize prop-based options with `React.useMemo`, so the form instance is not recreated on every render.

## Deprecated Methods

**`onFormInit` is deprecated.**
In older versions of AutoForm, `onFormInit` was used to grab the form instance. This is preserved for backward compatibility but should be replaced with `createFormControl` in new code.
