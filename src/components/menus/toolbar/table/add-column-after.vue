<template>
  <e-menus-button
    ico="table-add-column-after"
    :text="$t('table.addColumnAfter')"
    :hide-text="$toolbar.mode === 'classic'"
    :disabled="!editor?.can().addColumnAfter()"
    @menu-click="editor?.chain().focus().addColumnAfter().run()"
  />
</template>

<script setup lang="ts">
const editor = inject('editor')
const options = inject('options')
const $toolbar = useEditorState('toolbar', () => options)
</script>
