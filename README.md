# AutoForm

> Automatically render forms for your existing data schema.

## Maintained fork

This is a maintained fork of [vantezzen/autoform](https://github.com/vantezzen/autoform), published under the `@dual-autoform/*` npm scope so development can continue while the original project appears inactive. All credit for the original project, architecture, and prior releases goes to the original AutoForm maintainers and contributors.

**This fork includes integration support for React Hook Form and TanStack Form.**

Check out the [AutoForm documentation](https://autoform-dual.vercel.app) for more info, examples, and API references.

---

## AutoForm Skill (optional)

If you use AI coding assistants (such as Cursor, Claude Code, OpenCode, or GitHub Copilot), you can install the AutoForm skill. It gives your coding agent access to AutoForm-specific documentation, examples, and best practices.

```bash
npx skills add https://github.com/adityacodepublic/autoform/tree/tanstack-form-integration/skills --skill autoform
```

---

What is AutoForm? Let's say you have a zod schema that you already use for your backend:

```ts
import { z } from "zod";
import { ZodProvider } from "@dual-autoform/zod";

const userSchema = z.object({
  name: z.string(),
  birthday: z.coerce.date(),
  email: z.string().email(),
});

export const schemaProvider = new ZodProvider(userSchema);
```

With AutoForm, you can automatically render a form for this schema:

```tsx
import { AutoForm } from "@dual-autoform/mui/react-hook-form";
// shadcn CLI install: "@/components/ui/autoform/react-hook-form"
import { schemaProvider } from "./schema";

function MyForm() {
  return (
    <AutoForm
      schema={schemaProvider}
      onSubmit={(data) => {
        console.log(data);
      }}
      withSubmit
    />
  );
}
```

AutoForm itself is agnostic to the schema, rendering, and UI library you use. It also comes with official packages for popular UI libraries like Material UI, shadcn/ui, Mantine, Ant Design, Chakra UI, and validation libraries like Zod, Yup, and Joi.

## When to use AutoForm?

AutoForm is mostly meant as a drop-in form builder for your internal tools and simple forms with existing schemas. For example, if you already have schemas for your API and want to create a simple admin panel to edit user profiles, simply pass the schema to AutoForm and you're done.

AutoForm doesn't change how you write custom inputs or access data, state, and methods. You still use your form library the way you usually would.Rather than manually wiring up fields and writing binding boilerplate, AutoForm maps schema fields to the right input components, connects them to the form library, and sets up validation.

As forms almost always grow more complex, AutoForm gives you options to customize how forms are rendered (e.g. using the [`fieldConfig`](https://autoform-dual.vercel.app/docs/react/customization) option) and escape hatches to customize the form even further.

However, AutoForm does not aim to be a full-featured form builder or support every edge case in your schema. If you need more customization, feel free to customize AutoForm's [renderer](https://autoform-dual.vercel.app/docs/react/customization#customizing-the-react-package) in your project. For an example of how AutoForm can be extended for more powerful, YAML-based, multi-page forms, see [AutoForm YAML](https://github.com/roeyazroel/auto-form).

## shadcn/ui component

AutoForm evolved from a [shadcn/ui component](https://github.com/vantezzen/auto-form) into a standalone library with broader UI and schema support.

## Pick your form library

Ready to get started? Follow the guide for the form library you use:

- [React Hook Form guide](https://autoform-dual.vercel.app/docs/react/getting-started)
- [TanStack Form guide](https://autoform-dual.vercel.app/docs/tanstack/getting-started)

## Development

AutoForm uses a TurboRepo monorepo setup. To get started, run:

```bash
pnpm install
pnpm dev
```

This will start the development server for the documentation website and the AutoForm package itself.

For releases, AutoForm uses changesets. To create a new release, run:

```bash
pnpm build
pnpm check:packages
pnpm cypress
```

Use `pnpm cypress:open` to run the component tests in the Cypress UI.

To document a change, add a changeset:

```bash
pnpm changeset
```

To publish a release, run:

```bash
pnpm changeset version
pnpm changeset publish
```

## License

All packages in the AutoForm monorepo are licensed under the MIT license.
