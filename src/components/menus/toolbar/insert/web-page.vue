<template>
  <e-menus-button
    ico="web-page"
    :text="t('insert.web.text')"
    huge
    @menu-click="dialogVisible = true"
  >
    <e-modal
      :visible="dialogVisible"
      width="480px"
      :confirm-btn="t('insert.web.insert')"
      @confirm="insertWebPage"
      @close="dialogVisible = false"
    >
      <template #header>
        <EIcon name="web-page" />
        {{ t('insert.web.title') }}
      </template>
      <div class="umo-web-page-container">
        <div class="umo-web-page-tip" v-text="t('insert.web.tip')"></div>
        <t-form :data="formData" label-align="top">
          <t-form-item :label="t('insert.web.type')" name="type">
            <t-select v-model="formData.type" clearable>
              <t-option
                v-for="(item, index) in webPages"
                :key="index"
                :label="item.label"
                :value="index"
              >
                <span
                  class="umo-web-page-option-icon"
                  v-html="item.icon"
                ></span>
                {{ item.label }}
              </t-option>
              <template #prefixIcon>
                <span
                  class="umo-web-page-select-icon"
                  v-html="webPages[formData.type]?.icon"
                ></span>
              </template>
            </t-select>
          </t-form-item>
          <t-form-item :label="t('insert.web.url')" name="url">
            <t-input
              v-model.trim="formData.url"
              :status="formData.error ? 'error' : 'default'"
              type="url"
              clearable
              :placeholder="t('insert.web.placeholder')"
            />
          </t-form-item>
        </t-form>
      </div>
    </e-modal>
  </e-menus-button>
</template>

<script setup lang="ts">
import { l } from '~~/editor/src/composables/i18n'


const props = defineProps({
  pageType: {
    type: Number,
    default: 0,
  },
  pageUrl: {
    type: String,
    default: '',
  },
})
const editor = inject('editor')
const options = inject('options')
const { t, locale } = useI18n()

let dialogVisible = ref(false)

const webPages = ref([
  {
    label: t('insert.web.text'),
    icon: '<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="40" height="32" rx="3" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M4 11a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v9H4v-9z" stroke="currentColor" stroke-width="4"/><circle r="2" transform="matrix(0 -1 -1 0 10 14)" fill="currentColor"/><circle r="2" transform="matrix(0 -1 -1 0 16 14)" fill="currentColor"/></svg>',
    validate: (url: string) =>
      url.startsWith('http://') || url.startsWith('https://'),
  },
])
const formData = ref({
  type: '',
  url: '',
  error: false,
})

onMounted(() => {
  if (options.value.webPages.length > 0) {
    options.value.webPages.forEach((item: any) => {
      item.label = l(item.label, locale)
      webPages.value.push(item)
    })
  }
})

const insertWebPage = () => {
  const { validate, transformURL } = webPages.value[formData.value.type]
  if (!editor.value) {
    return
  }
  if (validate && !validate(formData.value.url)) {
    formData.value.error = true
    return
  }
  editor.value
    .chain()
    .focus()
    .setParagraph()
    .setIframe({
      type: formData.value.type,
      src: transformURL ? transformURL(formData.value.url) : formData.value.url,
    })
    .run()
  formData.value.error = false
  dialogVisible.value = false
}
watch(
  () => dialogVisible.value,
  (visible: boolean) => {
    if (visible) {
      formData.value.type = props.pageType
      formData.value.url = props.pageUrl
      formData.value.error = false
    } else {
      formData.value.type = ''
      formData.value.url = ''
      formData.value.error = false
    }
  },
)
</script>

<style lang="less" scoped>
.umo-web-page {
  &-container {
    padding: 2px;
    :deep(.umo-form) {
      &__item {
        margin-bottom: 10px;
      }
    }
  }
  &-tip {
    color: var(--umo-text-color-light);
    margin-bottom: 10px;
  }
  &-select-icon {
    display: inline-flex;
    align-items: center;
    :deep(svg) {
      width: 18px;
      height: 18px;
      display: block;
    }
  }
  &-option-icon {
    display: inline-flex;
    align-items: center;
    transform: translateY(3px);
    :deep(svg) {
      width: 16px;
      height: 16px;
      display: block;
    }
  }
}
</style>
