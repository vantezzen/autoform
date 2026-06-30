# React Hook Form shadcn Examples

These are pre-built React Hook Form example blocks you can directly view or install via the shadcn CLI. Each includes full working code.

### Real-time Validation Demo

Pattern: real-time validation.

Shows real-time validation with a disabled submit button until the form is valid. It creates an RHF control with `createFormControl({ mode: "all" })`, passes `formControl` into `AutoForm`, then reads `formState.isValid` with `useFormContext()` inside a custom submit button.

install command:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/realtime-validation-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/apps/docs/components/examples/faq/realtime-validation-demo.tsx

### Dialog Submit Demo

Pattern: external submit/reset.

Submits and resets AutoForm from buttons inside a Dialog. It shows both RHF patterns: a child reset button that calls `reset()` from `useFormContext()`, and an external dialog action area that creates `formControl` with `createFormControl()`, submits by targeting `formProps.id`, and resets with the external `reset` method.

install command:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/dialog-submit-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/apps/docs/components/examples/faq/external-dialog-submit-demo.tsx
- https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/apps/docs/components/examples/faq/external-dialog-form-control-demo.tsx

### Custom Fields Demo

Pattern: custom field components and custom value editors.

Adds custom inputs such as sliders, color pickers, radio cards, date pickers, steppers, and file uploads. Each custom field calls `useController({ name: id })`, reads `field.value`, and writes with `field.onChange`; schema fields route to those components with `fieldConfig({ fieldType: "..." })` and `formComponents`.

install command:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/custom-fields-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/apps/docs/components/examples/faq/custom-fields-demo.tsx
- https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/apps/docs/components/examples/faq/custom-field-components.tsx

### Ecommerce Checkout Demo

Pattern: dependent/conditional fields.

Builds a checkout form with cascading country/state selects, conditional coupon fields, gift message fields, payment fields, and cross-field validation. It binds fields with `useController`, clears dependent state with `setValue`, watches conditional fields with `useWatch`, and uses `useFormContext().subscribe()` inside `PaymentFieldWrapper` to swap the payment UI when the `FREE100` coupon is active.

install command:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/ecommerce-checkout-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/apps/docs/components/examples/faq/ecommerce-checkout-demo.tsx
- https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/apps/docs/components/examples/faq/ecommerce-checkout-fields.tsx

### Multi-step Form Demo

Pattern: multi-step form.

Implements a multi-step form with one schema per step, per-step validation, breadcrumb navigation, and collected submission data. The step controller reads RHF methods from `useFormContext()`, calls `trigger(undefined, { shouldFocus: true })` before moving forward, and collects current step values with `getValues()`.

install command:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/multistep-form-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/apps/docs/components/examples/faq/multistep-form.tsx
- https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/apps/docs/components/examples/faq/multistep-form-usage-demo.tsx

### Nested AutoForm Demo

Pattern: nested AutoForm.

Shows a nested AutoForm inside a Dialog as a custom field component. The outer field uses `useController({ name: id })`; the inner AutoForm submits a structured value and writes it back to the outer RHF field with `field.onChange`.

install command:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/nested-autoform-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/apps/docs/components/examples/faq/nested-autoform-demo.tsx

### Interactive Schema Demo

Pattern: dynamic schema playground.

Creates a dynamic form builder with Monaco Editor and AutoForm. The demo parses a Zod schema string, creates a schema provider at runtime, and renders the generated RHF AutoForm interactively. **Warning**: uses `eval()` for the schema editor demo, so do not use this pattern with untrusted input.

install command:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/interactive-schema-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/apps/docs/components/examples/faq/interactive-schema-demo-content.tsx
