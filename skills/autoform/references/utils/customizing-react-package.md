# Customizing the React Package

Use this only when the public package APIs are not enough. You can copy the React adapter source into your project and edit it directly.

## React Hook Form Adapter

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/autoform-react-source-rhf.json
```

## TanStack Form Adapter

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/autoform-react-source-tanstack.json
```

The adapter files are added to `lib/autoform/react/`. Change them as needed.
