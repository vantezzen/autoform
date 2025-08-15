---
"@autoform/zod": major
---

BREAKING CHANGES

- Requires `zod` version: `^3.25.0 || ^4.0.0`
- Unified `ZodProvider` and `fieldConfig` for Zod v3, v4, and zod/mini:

  ```ts
  import { ZodProvider, fieldConfig } from "@autoform/zod";
  ```

- Field Configuration `fieldConfig`:
  - Zod v3 uses `.superRefine()`:

    ```ts
    username: z.string().superRefine(
      fieldConfig({ description: "You cannot change this later." })
    );
    ```

  - Zod v4 uses `.check()`:
    ```ts
    username: z.string().check(
      fieldConfig({ description: "You cannot change this later." })
    );
    ```
