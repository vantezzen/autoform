# @autoform/vue

Vue 3 integration for [AutoForm](https://github.com/vantezzen/autoform) — automatically render forms from your Zod/Yup schema.

## Installation

```bash
pnpm add @autoform/vue @autoform/zod zod
```

## Usage

`@autoform/vue` follows the same pattern as `@autoform/react`. You provide UI components and form field components, and AutoForm handles the rest.

```vue
<script setup lang="ts">
import { AutoForm } from '@autoform/vue'
import { ZodProvider } from '@autoform/zod'
import { z } from 'zod'
import { MyUIComponents, MyFieldComponents } from './my-components'

const schema = new ZodProvider(
  z.object({
    name: z.string().min(2),
    email: z.string().email(),
    age: z.number().min(18),
  })
)

function onSubmit(data: any) {
  console.log('Validated:', data)
}
</script>

<template>
  <AutoForm
    :schema="schema"
    :ui-components="MyUIComponents"
    :form-components="MyFieldComponents"
    with-submit
    @submit="onSubmit"
  />
</template>
```

## Documentation

See the [AutoForm documentation](https://autoform.vantezzen.io) for full details on schema configuration, field customization, and more.

## License

MIT
