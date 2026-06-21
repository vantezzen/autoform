# React integration for AutoForm

This package provides the shared React contracts and adapter-agnostic hooks for AutoForm. Runtime implementations are available from the `react-hook-form` and `tanstack-form` subpaths. Most applications should use a UI integration such as `@acp-autoform/mui`.

## Installation

```bash
npm install @acp-autoform/react
```

Install one form engine and import its explicit entrypoint:

```tsx
import { AutoForm as RHFAutoForm } from "@acp-autoform/react/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@acp-autoform/react/tanstack-form";
```

For more information on how to use this package, see the [AutoForm documentation](https://autoform-acp-docs.vercel.app/docs/react/getting-started).
