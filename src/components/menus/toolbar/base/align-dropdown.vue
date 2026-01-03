<template>
  <e-menus-button
    :ico="`align-${textAlign}`"
    :text="t('base.align.title')"
    menu-type="popup"
    hide-text
    :disabled="!editor?.can().chain().focus().setTextAlign('center').run()"
    :popup-visible="popupVisible"
    @toggle-popup="togglePopup"
  >
    <template #content>
      <div class="umo-text-align-group">
        <e-menus-toolbar-base-align-left />
        <e-menus-toolbar-base-align-center />
        <e-menus-toolbar-base-align-right />
        <e-menus-toolbar-base-align-justify />
        <e-menus-toolbar-base-align-distributed />
      </div>
    </template>
  </e-menus-button>
</template>

<script setup lang="ts">
const { popupVisible, togglePopup } = usePopup()

const editor = inject('editor')

const textAlign = computed(() => {
  if (!editor.value) {
    return 'left'
  }
  if (editor.value.isActive({ textAlign: 'justify' })) {
    return 'left'
  }
  if (editor.value.isActive({ textAlign: 'center' })) {
    return 'center'
  }
  if (editor.value.isActive({ textAlign: 'right' })) {
    return 'right'
  }
  if (editor.value.isActive({ textAlign: 'justify' })) {
    return 'justify'
  }
  return 'left'
})
</script>

<style lang="less" scoped>
.umo-text-align-group {
  padding-top: 2px;
  margin: -5px 0;
}
</style>
