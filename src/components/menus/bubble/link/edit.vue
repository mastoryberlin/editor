<template>
  <e-menus-button
    ico="edit"
    :text="$t('insert.link.edit')"
    menu-type="popup"
    huge
    :popup-visible="popupVisible"
    @toggle-popup="togglePopup"
  >
    <template #content>
      <div class="umo-link-container" @click="emits('show-bubble')">
        <t-form label-align="top">
          <t-form-item :label="$t('insert.link.hrefText')">
            <t-input
              v-model.trim="text"
              :status="error.text ? 'error' : 'default'"
              :placeholder="$t('insert.link.hrefTextTip')"
              clearable
            />
          </t-form-item>
          <t-form-item :label="$t('insert.link.href')">
            <t-input
              v-model="href"
              :status="error.href ? 'error' : 'default'"
              type="url"
              clearable
              :placeholder="$t('insert.link.hrefTip')"
            />
          </t-form-item>
          <t-form-item>
            <t-button theme="primary" type="submit" @click="insertLink">{{
              $t('insert.link.insert')
            }}</t-button>
            <t-button
              theme="default"
              variant="text"
              style="margin-left: 10px"
              @click="removeLink"
              >{{ $t('insert.link.remove') }}</t-button
            >
          </t-form-item>
        </t-form>
      </div>
    </template>
  </e-menus-button>
</template>

<script setup lang="ts">

const emits = defineEmits(['show-bubble', 'hide-bubble'])

const { popupVisible, togglePopup } = usePopup()

const editor = inject('editor')

let text = ref('')
let href = ref('')
const error = ref({ text: false, href: false })
const insertLink = () => {
  if (text.value === '') {
    error.value.text = true
    return
  }
  if (
    !href.value.startsWith('http://') &&
    !href.value.startsWith('https://') &&
    !href.value.startsWith('ftp://') &&
    !href.value.startsWith('ftps://') &&
    !href.value.startsWith('mailto://')
  ) {
    error.value.href = true
    return
  }
  error.value.text = false
  error.value.href = false
  editor.value
    .chain()
    .extendMarkRange('link')
    .updateAttributes('link', {
      href: href.value,
    })
    .insertContent(text.value)
    .run()
  popupVisible.value = false
}
const removeLink = () => {
  editor.value?.chain().focus().unsetLink().run()
  popupVisible.value = false
}

watch(
  () => popupVisible.value,
  (val: boolean) => {
    if (val) {
      const { meta } = editor.value.storage.link
      text.value = meta.target.textContent
      href.value = meta.href ?? ''
    } else {
      text.value = ''
      href.value = ''
      error.value.text = false
      error.value.href = false
    }
  },
)
</script>

<style lang="less" scoped>
.umo-link-container {
  padding: 0 2px 2px;
  margin-top: -6px;
  width: 320px;
  :deep(.umo-form__item) {
    margin-bottom: 5px;
    &:last-child {
      margin-top: 15px;
    }
  }
}
</style>
