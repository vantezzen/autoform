# TanStack Form shadcn Examples

These are pre-built TanStack Form example blocks you can directly view or install via the shadcn CLI. Each includes full working code.

### Real-time Validation Demo

Pattern: real-time validation.

Shows real-time validation with a disabled submit button until the form is valid. The custom submit button gets the TanStack form with `useFormContext()` and uses `form.Subscribe` with `selector={(state) => state.canSubmit}` to reactively enable submit.

install command;

```bash
npx shadcn@latest add https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/packages/shadcn/registry/tanstack-realtime-validation-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/apps/docs/components/examples/faq/tanstack-realtime-validation-demo.tsx

### Dialog Submit Demo

Pattern: external submit/reset.

Submits and resets AutoForm from buttons inside a Dialog. It shows both TanStack patterns: a child reset button that calls `form.reset()` from `useFormContext()`, and an external dialog action area that creates a form with `useAppForm(formOptions({}))`, passes it to `AutoForm` as `formControl`, submits with `form.handleSubmit()`, and resets with `form.reset()`.

install command;

```bash
npx shadcn@latest add https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/packages/shadcn/registry/tanstack-dialog-submit-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/apps/docs/components/examples/faq/tanstack-dialog-submit-demo.tsx
- https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/apps/docs/components/examples/faq/tanstack-dialog-form-control-demo.tsx

### Custom Fields Demo

Pattern: custom field components and custom value editors.

Adds custom inputs such as sliders, color pickers, radio cards, date pickers, steppers, and file uploads. Each custom field calls `useFieldContext<T>()`, reads `field.state.value`, handles blur with `field.handleBlur`, and writes with `field.handleChange`; schema fields route to those components with `fieldConfig({ fieldType: "..." })` and `formComponents`.

install command;

```bash
npx shadcn@latest add https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/packages/shadcn/registry/tanstack-custom-fields-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/apps/docs/components/examples/faq/tanstack-custom-fields-demo.tsx
- https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/apps/docs/components/examples/faq/tanstack-custom-field-components.tsx

### Ecommerce Checkout Demo

Pattern: dependent/conditional fields.

Builds a checkout form with cascading country/state selects, conditional coupon fields, gift message fields, payment fields, and cross-field validation. It binds fields with `useFieldContext`, reads the parent form with `useFormContext`, clears dependent state with `form.setFieldValue`, and uses `form.Subscribe` selectors to react to `country`, `haveCoupon`, `isGift`, and `couponCode`.

install command;

```bash
npx shadcn@latest add https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/packages/shadcn/registry/tanstack-ecommerce-checkout-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/apps/docs/components/examples/faq/tanstack-ecommerce-checkout-demo.tsx
- https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/apps/docs/components/examples/faq/tanstack-ecommerce-checkout-fields.tsx

### Multi-step Form Demo

Pattern: multi-step form.

Implements a multi-step form with one schema per step, breadcrumb navigation, and collected submission data. Each step uses its own AutoForm/schema, stores submitted step values in React state, and advances after the current step's AutoForm submit succeeds.

install command;

```bash
npx shadcn@latest add https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/packages/shadcn/registry/tanstack-multistep-form-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/apps/docs/components/examples/faq/tanstack-multistep-form.tsx
- https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/apps/docs/components/examples/faq/tanstack-multistep-form-usage-demo.tsx

### Nested AutoForm Demo

Pattern: nested AutoForm.

Shows a nested AutoForm inside a Dialog as a custom field component. The outer field uses `useFieldContext<string[]>()`; the inner AutoForm submits a structured value and writes the selected colors back to the outer TanStack field with `field.handleChange`.

install command;

```bash
npx shadcn@latest add https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/packages/shadcn/registry/tanstack-nested-autoform-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/apps/docs/components/examples/faq/tanstack-nested-autoform-demo.tsx

### Interactive Schema Demo

Pattern: dynamic schema playground.

Creates a dynamic form builder with Monaco Editor and AutoForm. The demo parses a Zod schema string, creates a schema provider at runtime, and renders the generated TanStack AutoForm interactively. **Warning**: uses `eval()` for the schema editor demo, so do not use this pattern with untrusted input.

install command;

```bash
npx shadcn@latest add https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/packages/shadcn/registry/tanstack-interactive-schema-demo.json
```

Source files installed:

- https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/apps/docs/components/examples/faq/tanstack-interactive-schema-demo-content.tsx
