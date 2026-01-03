<template>
  <e-menus-button
    ico="table-header-row"
    :text="t('table.toggleHeaderRow')"
    :hide-text="$toolbar.mode === 'classic'"
    :disabled="!editor?.can().toggleHeaderRow()"
    @menu-click="editor?.chain().focus().toggleHeaderRow().run()"
  />
</template>

<script setup lang="ts">
const editor = inject('editor')
const options = inject('options')
const $toolbar = useEditorState('toolbar', () => options)
</script>
