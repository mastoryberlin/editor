<template>
  <e-menus-button
    ico="image-rotate"
    :text="$t('bubbleMenu.image.rotateCC')"
    @menu-click="setRotate(-90)"
  />
  <e-menus-button
    :text="$t('bubbleMenu.image.rotateC')"
    @menu-click="setRotate(90)"
  >
    <EIcon name="image-rotate" style="transform: rotateY(180deg)" />
  </e-menus-button>
</template>

<script setup lang="ts">
import { getSelectionNode } from '~~/editor/src/extensions/selection'

const editor = inject('editor')

const setRotate = (rotate: number) => {
  const image = editor.value ? getSelectionNode(editor.value) : null
  const { angle } = image?.attrs ?? {}
  if (image) {
    editor.value?.commands.updateAttributes(image.type, {
      angle: angle ? angle + rotate : rotate,
    })
  }
}
</script>
