# @kyokusu-ui/vue

Vue 3 components for Kyokusu UI. Minimalist, fully typed, dark mode ready.

## Install

```bash
npm install @kyokusu-ui/vue
```

```js
import '@kyokusu-ui/vue/dist/index.css'
```

## Usage

### Button

```vue
<script setup>
import { Button } from '@kyokusu-ui/vue'
</script>

<template>
  <Button variant="primary" @click="handleClick">Submit</Button>
</template>
```

### Input

```vue
<script setup>
import { Input } from '@kyokusu-ui/vue'
</script>

<template>
  <Input label="Email" type="email" placeholder="user@example.com" />
</template>
```

### Select

```vue
<script setup>
import { Select } from '@kyokusu-ui/vue'
</script>

<template>
  <Select
    label="Country"
    :options="[
      { value: 'us', label: 'United States' },
      { value: 'jp', label: 'Japan' }
    ]"
  />
</template>
```

### SearchSelect

```vue
<script setup>
import { SearchSelect } from '@kyokusu-ui/vue'
</script>

<template>
  <SearchSelect
    label="Framework"
    :options="[
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' }
    ]"
  />
</template>
```

### MultiSelect

```vue
<script setup>
import { MultiSelect } from '@kyokusu-ui/vue'
</script>

<template>
  <MultiSelect
    label="Tags"
    :options="[
      { value: 'ts', label: 'TypeScript' },
      { value: 'rust', label: 'Rust' }
    ]"
  />
</template>
```

### Toggle

```vue
<script setup>
import { Toggle } from '@kyokusu-ui/vue'
</script>

<template>
  <Toggle label="Dark mode" />
</template>
```

### DatePicker

```vue
<script setup>
import { DatePicker } from '@kyokusu-ui/vue'
</script>

<template>
  <DatePicker label="Birthday" type="date" />
</template>
```

### Accordion

```vue
<script setup>
import { Accordion } from '@kyokusu-ui/vue'
</script>

<template>
  <Accordion :multiple="true">
    <AccordionItem title="Section 1">Content</AccordionItem>
    <AccordionItem title="Section 2">More</AccordionItem>
  </Accordion>
</template>
```

### Table

```vue
<script setup>
import { Table } from '@kyokusu-ui/vue'
</script>

<template>
  <Table
    :headers="[
      { key: 'name', label: 'Name', sortable: true },
      { key: 'role', label: 'Role' }
    ]"
    :items="[
      { name: 'Alice', role: 'Engineer' },
      { name: 'Bob', role: 'Designer' }
    ]"
    :searchable="true"
  />
</template>
```

### Card

```vue
<script setup>
import { Card } from '@kyokusu-ui/vue'
</script>

<template>
  <Card variant="default" padding="md" :shadow="true">
    <p>Card content</p>
  </Card>
</template>
```

### Badge

```vue
<script setup>
import { Badge } from '@kyokusu-ui/vue'
</script>

<template>
  <Badge text="New" variant="destructive" size="sm" />
</template>
```

### Spinner

```vue
<script setup>
import { Spinner } from '@kyokusu-ui/vue'
</script>

<template>
  <Spinner size="md" variant="primary" />
</template>
```

### Tooltip

```vue
<script setup>
import { Tooltip } from '@kyokusu-ui/vue'
</script>

<template>
  <Tooltip content="Helpful tip" placement="top">
    <button>Hover me</button>
  </Tooltip>
</template>
```

### TeleportedTooltip

```vue
<script setup>
import { TeleportedTooltip } from '@kyokusu-ui/vue'
</script>

<template>
  <TeleportedTooltip content="Teleported tip" placement="bottom">
    <button>Hover</button>
  </TeleportedTooltip>
</template>
```

### Popover

```vue
<script setup>
import { Popover } from '@kyokusu-ui/vue'
</script>

<template>
  <Popover title="Info" content="Details here" trigger="click">
    <button>Toggle</button>
  </Popover>
</template>
```

### DropdownMenu

```vue
<script setup>
import { DropdownMenu } from '@kyokusu-ui/vue'
</script>

<template>
  <DropdownMenu
    :items="[
      { id: 'copy', label: 'Copy' },
      { id: 'sep', label: '', separator: true },
      { id: 'more', label: 'More', submenu: [
        { id: 'archive', label: 'Archive' }
      ]}
    ]"
    trigger="click"
  >
    <button>Open menu</button>
  </DropdownMenu>
</template>
```

### ModalWindow

```vue
<script setup>
import { ref } from 'vue'
import { ModalWindow } from '@kyokusu-ui/vue'

const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">Open</Button>
  <ModalWindow v-model="isOpen" title="Confirm">
    <p>Are you sure?</p>
  </ModalWindow>
</template>
```

### ModalConfirm

```vue
<script setup>
import { ref } from 'vue'
import { ModalConfirm } from '@kyokusu-ui/vue'

const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">Delete</Button>
  <ModalConfirm
    v-model="isOpen"
    title="Delete?"
    content="This cannot be undone."
    @confirm="handleDelete"
  />
</template>
```

### Notification

```vue
<script setup>
import { Notification } from '@kyokusu-ui/vue'
</script>

<template>
  <Notification />
</template>
```

### Separator

```vue
<script setup>
import { Separator } from '@kyokusu-ui/vue'
</script>

<template>
  <Separator />
</template>
```

### Label

```vue
<script setup>
import { Label } from '@kyokusu-ui/vue'
</script>

<template>
  <Label text="Username" :required="true" />
</template>
```

### RichText

```vue
<script setup>
import { RichText } from '@kyokusu-ui/vue'
</script>

<template>
  <RichText placeholder="Write something..." />
</template>
```

### Carousel

```vue
<script setup>
import { Carousel } from '@kyokusu-ui/vue'
</script>

<template>
  <Carousel
    :items="[
      { type: 'image', src: '/img1.jpg' },
      { type: 'image', src: '/img2.jpg' }
    ]"
    :auto-play="true"
  />
</template>
```

### ImagePicker

```vue
<script setup>
import { ImagePicker } from '@kyokusu-ui/vue'
</script>

<template>
  <ImagePicker />
</template>
```

### CircleBlock

```vue
<script setup>
import { CircleBlock } from '@kyokusu-ui/vue'
</script>

<template>
  <CircleBlock label="A" variant="primary" />
</template>
```

### PageLayout

```vue
<script setup>
import { PageLayout } from '@kyokusu-ui/vue'
</script>

<template>
  <PageLayout title="Dashboard">
    <p>Content</p>
  </PageLayout>
</template>
```

## License

MIT
