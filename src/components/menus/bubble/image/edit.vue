<template>
  <e-menus-toolbar-tools-qrcode v-if="type === 'qrcode'" :content="content" />
  <e-menus-toolbar-tools-barcode v-if="type === 'barcode'" :content="content" />
  <e-menus-toolbar-tools-diagrams v-if="type === 'diagrams'" :content="content" />
  <e-menus-toolbar-tools-mermaid v-if="type === 'mermaid'" :content="content" />
</template>

<script setup lang="ts">
const editor = inject('editor')
const type = computed(() => {
  return editor.value?.getAttributes('image').type
})
const content = computed(() => {
  return editor.value?.getAttributes('image').content
})
</script>
