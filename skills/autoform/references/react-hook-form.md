# React Hook Form Adapter: Accessing form data, states and methods

## Imports

For npm UI packages:

```tsx
import { AutoForm } from "@dual-autoform/mui/react-hook-form";
```

For shadcn/ui:

```tsx
import { AutoForm } from "@/components/ui/autoform/react-hook-form";
```

```tsx
import type {
  AutoFormFieldProps,
  FieldWrapperProps,
} from "@dual-autoform/react/react-hook-form";
```

> AutoForm wraps the form with React Hook Form's `FormProvider` so `no need` to pass the control object that various hooks need.

## Custom Fields

RHF custom fields use [`useController`](https://react-hook-form.com/docs/usecontroller) from `react-hook-form`.

```tsx
import { useController } from "react-hook-form";
import type { AutoFormFieldProps } from "@dual-autoform/react/react-hook-form";

function SliderField({ id, inputProps }: AutoFormFieldProps) {
  const { field } = useController({ name: id });

  return (
    <input id={id} type="range" min={0} max={100} {...inputProps} {...field} />
  );
}
```

Register custom fields with `formComponents`, and route schema fields with `fieldConfig({ fieldType: "..." })`.

```tsx
const schema = z.object({
  volume: z.coerce.number().check(fieldConfig({ fieldType: "slider" })),
});

export const schemaProvider = new ZodProvider(schema);

<AutoForm schema={schemaProvider} formComponents={{ slider: SliderField }} />;
```

## Inside AutoForm Children

Components rendered inside `<AutoForm>...</AutoForm>` can use `useFormContext` from `react-hook-form`.

```tsx
import { AutoForm } from "@dual-autoform/mui/react-hook-form";
import { useFormContext } from "react-hook-form";

function QuickActions() {
  const {
    watch,
    setValue,
    reset,
    formState: { isValid },
  } = useFormContext();
  const email = watch("email");

  return (
    <div>
      <button type="button" onClick={() => setValue("email", "dev@acme.com")}>
        Use sample email
      </button>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
      <span>Current email: {email ?? "-"}</span>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </div>
  );
}

export default function MyForm() {
  return (
    <AutoForm schema={schemaProvider}>
      <QuickActions />
    </AutoForm>
  );
}
```

**Access or subscribe to form data and states**
useWatch: Subscribe to input changes with isolated component re-renders.
watch: Subscribe to input value changes and trigger re-render of the calling component
formState: Access real-time form state properties, triggers re-render of the calling component
subscribe: Subscribe to form state changes outside the render cycle. no re-render
getValues: Read current form values without subscribing to re-renders.

## External Submit Or Reset

Use `createFormControl` when components live outside the AutoForm tree, for example in a dialog footer. Create the control once.

```tsx
import * as React from "react";
import { createFormControl } from "react-hook-form";

const { formControl, handleSubmit, reset } = React.useMemo(
  () => createFormControl({ mode: "all" }),
  [],
);

<AutoForm
  schema={schemaProvider}
  formControl={formControl}
  defaultValues={{ username: "" }}
/>;

<button type="button" onClick={handleSubmit((data) => console.log(data))}>
  Submit
</button>;
<button type="button" onClick={() => reset()}>
  Reset
</button>;
```

## onSubmit

```tsx
<AutoForm
  onSubmit={(data, form, event) => {
    // Get schema validated data
    // You can use the "form" argument to access the underlying react-hook-form instance
  }}
/>
```

## Defaults And Values

- Put initial values on `<AutoForm defaultValues={...} />`.
- Use `<AutoForm values={...} />` only when the form should track external state.

## Common RHF Mistakes

- Do not use `useFieldContext`; use `useController`.
- Do not import `AutoForm` from the package root.
- Do not render labels or errors inside ordinary custom field components; `FieldWrapper` handles them.
