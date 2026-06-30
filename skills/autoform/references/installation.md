# Installation Guide

## Form Engine Peer Dependency

Choose one form adapter.

### React Hook Form adapter

```bash
npm install @dual-autoform/react react-hook-form @hookform/resolvers
```

Import `AutoForm` from the React Hook Form subpath of your UI package:

```tsx
import { AutoForm } from "@dual-autoform/mui/react-hook-form";
```

For shadcn/ui, import from the copied React Hook Form component path:

```tsx
import { AutoForm } from "@/components/ui/autoform/react-hook-form";
```

Import shared AutoForm types from the React Hook Form adapter path.

```tsx
import type {
  AutoFormFieldProps,
  FieldWrapperProps,
} from "@dual-autoform/react/react-hook-form";
```

### TanStack Form adapter

```bash
npm install @dual-autoform/react @tanstack/react-form
```

Import `AutoForm` from the TanStack Form subpath of your UI package:

```tsx
import { AutoForm } from "@dual-autoform/mui/tanstack-form";
```

For shadcn/ui, import from the copied TanStack Form component path:

```tsx
import { AutoForm } from "@/components/ui/autoform/tanstack-form";
```

Import shared AutoForm types from the TanStack Form adapter path.

```tsx
import type {
  AutoFormFieldProps,
  FieldWrapperProps,
} from "@dual-autoform/react/tanstack-form";
```

## UI Library Installation

### shadcn/ui (registry — no npm package)

shadcn/ui uses the shadcn CLI to copy AutoForm components directly into your project. No `@dual-autoform/shadcn` npm package is installed.
Make sure you have shadcn and tailwind initialised in your project, see `references/utils/shadcn-tailwind-installation.md` for shadcn installation.

```bash
# React Hook Form
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/autoform-rhf.json

# TanStack Form
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/autoform-tanstack.json
```

This installs the AutoForm component into `components/ui/autoform/`.

Import path after installation:

```tsx
import { AutoForm } from "@/components/ui/autoform/react-hook-form";
// Or: @/components/ui/autoform/tanstack-form
import type { FieldTypes } from "@/components/ui/autoform";
```

### Material UI (MUI)

Peer dependencies:

```bash
npm install @mui/material@^6 @mui/icons-material@^6 @emotion/react@^11 @emotion/styled@^11
```

AutoForm package:

```bash
npm install @dual-autoform/mui
```

Import:

```tsx
import { AutoForm } from "@dual-autoform/mui/react-hook-form";
// Or: @dual-autoform/mui/tanstack-form
import type { FieldTypes } from "@dual-autoform/mui";
```

### Mantine

Peer dependencies:

```bash
npm install @mantine/core@^7 @mantine/dates@^7
```

AutoForm package:

```bash
npm install @dual-autoform/mantine
```

Import:

```tsx
import { AutoForm } from "@dual-autoform/mantine/react-hook-form";
// Or: @dual-autoform/mantine/tanstack-form
import type { FieldTypes } from "@dual-autoform/mantine";
```

### Ant Design

Peer dependencies:

```bash
npm install antd@^5
```

AutoForm package:

```bash
npm install @dual-autoform/ant
```

Import:

```tsx
import { AutoForm } from "@dual-autoform/ant/react-hook-form";
// Or: @dual-autoform/ant/tanstack-form
import type { FieldTypes } from "@dual-autoform/ant";
```

### Chakra UI

Peer dependencies:

```bash
npm install @chakra-ui/react@^3.8 @emotion/react@^11.14
```

AutoForm package:

```bash
npm install @dual-autoform/chakra
```

Import:

```tsx
import { AutoForm } from "@dual-autoform/chakra/react-hook-form";
// Or: @dual-autoform/chakra/tanstack-form
import type { FieldTypes } from "@dual-autoform/chakra";
```

---

## Schema Provider Installation

### Zod

```bash
npm install @dual-autoform/zod zod
```

Requires zod ≥ 3.25.0. Supports Zod v3, Zod v4, and Zod Mini from the same import path

```tsx
import { ZodProvider, fieldConfig } from "@dual-autoform/zod";
```

### Yup

```bash
npm install @dual-autoform/yup yup
```

```tsx
import { YupProvider, fieldConfig } from "@dual-autoform/yup";
```

### Joi

```bash
npm install @dual-autoform/joi joi
```

```tsx
import { JoiProvider, fieldConfig } from "@dual-autoform/joi";
```
