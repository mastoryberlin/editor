<template>
  <e-menus-button
    :text="t('base.lineHeight.text')"
    ico="line-height"
    menu-type="dropdown"
    hide-text
    :select-options="lineHeights"
    @click="setLineHeight"
  />
</template>

<script setup lang="ts">
import { l } from '~~/editor/src/composables/i18n'

const editor = inject('editor')
const options = inject('options')
const { t, locale } = useI18n()

const lineHeights = computed(() => {
  return options.value.dicts?.lineHeights.map((item: any) => {
    return {
      content: item.default
        ? l(item.label, locale) + t('base.lineHeight.default')
        : l(item.label, locale),
      value: item.value,
      active: editor.value?.isActive({ lineHeight: item.value }),
    }
  })
})

const setLineHeight = ({
  content,
  value,
}: {
  content: string
  value: string
}) => {
  if (!content) {
    return
  }
  editor.value?.chain().focus().setLineHeight(value).run()
}
</script>
