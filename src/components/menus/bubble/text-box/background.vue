<template>
  <e-menus-button
    ico="table-cells-background"
    :text="t('bubbleMenu.textBox.background')"
    menu-type="popup"
    huge
    :popup-visible="popupVisible"
    @toggle-popup="togglePopup"
  >
    <template #content>
      <e-picker-color default-color="transparent" @change="colorChange" />
    </template>
  </e-menus-button>
</template>

<script setup lang="ts">
import { getSelectionNode } from '~~/editor/src/extensions/selection'
const emits = defineEmits(['change'])

const { popupVisible, togglePopup } = usePopup()
const editor = inject('editor')

const colorChange = (color: any) => {
  popupVisible.value = false
  const backgroundColor = color === '' ? null : color
  const textBox = editor.value ? getSelectionNode(editor.value) : null
  if (textBox) {
    editor.value?.commands.updateAttributes(textBox.type, {
      backgroundColor,
    })
  }
}
</script>
