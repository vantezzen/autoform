# AutoForm

> Automatically render forms for your existing data schema.

## Maintained fork

This package set is a maintained fork of [vantezzen/autoform](https://github.com/vantezzen/autoform). The fork is published under the `@acp-autoform/*` npm scope so development and releases can continue while the original project appears inactive. Credit for the original project, architecture, and prior releases belongs to the original AutoForm maintainers and contributors.

Check out the [AutoForm documentation](https://autoform-acp-docs.vercel.app) for more information, examples, and API references.

---

## AutoForm Skill (optional)

If you use AI coding assistants (such as Cursor, Claude Code, OpenCode, or GitHub Copilot), you can install the AutoForm skill. It gives your coding agent access to AutoForm-specific documentation, examples, and best practices.

```bash
npx skills add https://github.com/adityacodepublic/autoform/tree/acp-package/skills --skill autoform
```

---

What is AutoForm? Let's say you have a zod schema that you already use for your backend:

```ts
import { z } from "zod";
import { ZodProvider } from "@acp-autoform/zod";

const userSchema = z.object({
  name: z.string(),
  birthday: z.coerce.date(),
  email: z.string().email(),
});

export const schemaProvider = new ZodProvider(userSchema);
```

With AutoForm, you can automatically render a form for this schema:

```tsx
import { AutoForm } from "@/components/ui/autoform/react-hook-form";
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

AutoForm itself is agnostic to the schema library, rendering library and UI library you use, but it comes with a set of official packages that make it easy to use with popular libraries like Zod, React, shadcn, Material UI etc.

## When to use AutoForm?

AutoForm is mostly meant as a drop-in form builder for your internal and low-priority forms with existing schemas. For example, if you already have schemas for your API and want to create a simple admin panel to edit user profiles, simply pass the schema to AutoForm and you're done.

Instead of manually binding each component to the form, handling field registration, and verifying every connection is set up correctly, AutoForm handles that mapping for you. It looks at your schema and automatically stitches each pre-built component into the right place, so you're not writing the binding boilerplate and setup for every field.

**AutoForm works best when:**

- Your input components are already created
- Your validation schema is ready
- You want to skip the repetitive work of connecting each component to the form correctly

Build your components and schema, AutoForm brings them together.

As forms almost always grow more complex, AutoForm gives you options to customize how forms are rendered (e.g. using the [`fieldConfig`](/docs/react/customization) option) and gives you escape hatches to customize the form even further.

However, AutoForm does not aim to be a full-featured form builder and support every edge case in your schema. If you need more customization, feel free to customize AutoForm's renderer in your project. For an example on how AutoForm can be extended for more powerful, YAML-based, multi-page forms, see [AutoForm YAML](https://github.com/roeyazroel/auto-form).

## Development

AutoForm uses a TurboRepo monorepo setup. To get started, run:

```bash
npm install
npm run dev
```

This will start the development server for the documentation website and the AutoForm package itself.

For releases, AutoForm uses changesets. To create a new release, run:

```bash
npm run build
npm run cypress # Run the component tests
npx changeset
```

This will guide you through creating a new changeset. To publish the changeset, run:

```bash
npx changeset version
npx changeset publish
```

## License

All packages in the AutoForm monorepo are licensed under the MIT license.
