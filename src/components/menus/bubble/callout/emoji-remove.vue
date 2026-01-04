<template>
  <e-menus-button
    ico="remove"
    :text="t('bubbleMenu.callout.removeEmoji')"
    @menu-click="removeEmoji"
  />
</template>

<script setup lang="ts">
import { getSelectionNode } from '~~/editor/src/extensions/selection'

const emits = defineEmits(['change'])

const editor = inject('editor')

const { t } = useI18n()

const removeEmoji = () => {
  const callout = editor.value ? getSelectionNode(editor.value) : null
  if (callout) {
    editor.value?.commands.updateAttributes('callout', {
      icon: null,
    })
  }
}
</script>
