# Setup Shadcn

# 1. Use the CLI

Use the CLI to scaffold a new project directly from the terminal:

```bash
npx shadcn@latest init -t [framework]
```

Supported framework templates:

| Framework      | Template Value |
| -------------- | -------------- |
| Next.js        | `next`         |
| Vite           | `vite`         |
| TanStack Start | `start`        |
| React Router   | `react-router` |
| Astro          | `astro`        |

Laravel setup:

```bash
laravel new my-app
npx shadcn@latest init
```

---

# 2. Existing Project

If you already have an application:
Follow the framework specfic steps.

---

## Next.js

### Step 1: Create Project

If you need a new Next.js project, create one with `create-next-app`. Otherwise, skip this step.

```bash
npx create-next-app@latest
```

Choose the recommended defaults so Tailwind CSS, the App Router, and the default `@/*` import alias are configured for you.

If you prefer a `src/` directory, use `--src-dir` or choose `Yes` when prompted:

```bash
npx create-next-app@latest --src-dir
```

With `--src-dir`, Next.js places your app in `src/app` and configures the `@/*` alias to point to `./src/*`.

### Step 2: Configure Tailwind CSS and Import Aliases

If you created your project with the recommended `create-next-app` defaults, you can skip this step.

If you're adding shadcn/ui to an older or custom Next.js app, make sure Tailwind CSS is installed first.

Then make sure your `tsconfig.json` includes the `@/*` import alias:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

If you used `--src-dir`, point the alias to `./src/*` instead.

### Step 3: Run the CLI

Run the `shadcn` init command to set up shadcn/ui in your project.

```bash
npx shadcn@latest init
```

### Step 4: Add Components

You can now start adding components to your project.

```bash
npx shadcn@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```tsx
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}
```

If you used `--src-dir`, add the component to `src/app/page.tsx` instead.

---

## Vite

### Step 1: Create Project

If you need a new Vite project, create one first and select the **React + TypeScript** template. Otherwise, skip this step.

```bash
npm create vite@latest
```

### Step 2: Add Tailwind CSS

If your project already has Tailwind CSS configured, skip this step.

```bash
npm install tailwindcss @tailwindcss/vite
```

Replace everything in `src/index.css` with the following:

```css
@import "tailwindcss";
```

### Step 3: Edit tsconfig.json file

If your project already has the `@/*` alias configured, skip this step.

Vite splits TypeScript configuration across multiple files. Add the `baseUrl` and `paths` properties to the `compilerOptions` section of `tsconfig.json` and `tsconfig.app.json`:

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Step 4: Edit tsconfig.app.json file

Add the same alias to `tsconfig.app.json` so your editor can resolve imports:

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

### Step 5: Update vite.config.ts

Install `@types/node` and update `vite.config.ts` so Vite can resolve the `@` alias:

```bash
npm install -D @types/node
```

```ts
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Step 6: Run the CLI

Run the `shadcn` init command to set up shadcn/ui in your project:

```bash
npx shadcn@latest init
```

### Step 7: Add Components

You can now start adding components to your project.

```bash
npx shadcn@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```tsx
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}

export default App;
```

---

## Tanstack start

### Step 1: Create Project

If you need a new TanStack Start project, create one first. Otherwise, skip this step.

```bash
npx @tanstack/cli@latest create
```

Choose TanStack Start, the React framework, and the recommended defaults so Tailwind CSS and the `@/*` import alias are configured for you.

> Do not add the `shadcn` add-on when prompted. The `shadcn` CLI will configure shadcn/ui later in this guide.

The TanStack CLI already configures Tailwind CSS and the default `@/*` import alias for you. If you're adding shadcn/ui to an older or custom TanStack Start app, make sure both are configured before continuing.

### Step 2: Run the CLI

Run the `shadcn` init command to set up shadcn/ui in your project.

```bash
npx shadcn@latest init
```

### Step 3: Add Components

You can now start adding components to your project.

```bash
npx shadcn@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```tsx
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Button>Click me</Button>
    </div>
  );
}
```

---

## React router

### Step 1: Create Project

If you need a new React Router project, create one first. Otherwise, skip this step.

```bash id="n6h1tq"
npm create react-router@latest
```

`create-react-router` already configures Tailwind CSS and the default `~/*` import alias for you. If you're adding shadcn/ui to an older or custom React Router app, make sure both are configured before continuing.

### Step 2: Run the CLI

Run the `shadcn` init command to set up shadcn/ui in your project.

```bash id="0ct4yb"
npx shadcn@latest init
```

### Step 3: Add Components

You can now start adding components to your project.

```bash id="ry5y5i"
npx shadcn@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```tsx id="gg7rdw"
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}
```
