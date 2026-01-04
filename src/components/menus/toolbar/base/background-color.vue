<template>
  <e-menus-button
    :text="text || $t('base.bgColor')"
    menu-type="popup"
    popup-handle="arrow"
    hide-text
    :popup-visible="popupVisible"
    @toggle-popup="togglePopup"
  >
    <icon
      name="background-color"
      class="umo-icon-background-color"
      :style="{
        background: editor?.getAttributes('highlight')?.color || currentColor,
      }"
    />
    <template #content>
      <e-picker-color :default-color="defaultColor" @change="colorChange" />
    </template>
  </e-menus-button>
</template>

<script setup lang="ts">

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  modeless: {
    type: Boolean,
    default: false,
  },
  defaultColor: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['change'])

const { popupVisible, togglePopup } = usePopup()
const editor = inject('editor')

let currentColor = ref<string | undefined>()

const colorChange = (color: string) => {
  currentColor.value = color
  popupVisible.value = false

  if (props.modeless) {
    emits('change', currentColor.value)
    return
  }

  if (color === '') {
    editor.value?.chain().focus().unsetHighlight().run()
  } else {
    editor.value?.chain().focus().setHighlight({ color }).run()
  }
}
</script>

<style lang="less" scoped>
.umo-icon-background-color {
  border-radius: 2px;
}
</style>
