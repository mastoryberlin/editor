<template>
  <e-menus-button
    :ico="content ? 'edit' : 'qrcode'"
    :text="content ? t('tools.qrcode.edit') : t('tools.qrcode.text')"
    huge
    @menu-click="menuClick"
  >
    <e-modal
      :visible="dialogVisible"
      width="695px"
      @confirm="setQrcode"
      @close="dialogVisible = false"
    >
      <template #header>
        <EIcon name="qrcode" />
        {{ content ? t('tools.qrcode.edit') : t('tools.qrcode.text') }}
      </template>
      <div class="umo-qrcode-container">
        <div class="umo-qrcode-toolbar">
          <e-menus-button
            style="width: 126px"
            :text="t('tools.qrcode.level')"
            :select-options="levels"
            menu-type="select"
            :select-value="config.ecl"
            @menu-click="
              (value: string) => {
                config.ecl = value
              }
            "
          ></e-menus-button>
          <e-menus-button
            menu-type="input"
            :tooltip="t('tools.qrcode.paddingTip')"
          >
            <t-input-number
              v-model="config.padding"
              size="small"
              theme="normal"
              :max="10"
              :min="0"
              :allow-input-over-limit="false"
              placeholder=""
            >
              <template #label
                ><span v-text="t('tools.qrcode.padding')"></span
              ></template>
            </t-input-number>
          </e-menus-button>
          <e-menus-button menu-type="input" :tooltip="t('tools.qrcode.widthTip')">
            <t-input-number
              v-model="config.width"
              size="small"
              theme="normal"
              :max="1024"
              :min="64"
              :allow-input-over-limit="false"
              placeholder=""
            >
              <template #label
                ><span v-text="t('tools.qrcode.width')"></span
              ></template>
            </t-input-number>
          </e-menus-button>
          <t-divider layout="vertical" />
          <e-menus-toolbar-base-color
            :text="t('tools.qrcode.color')"
            :default-color="config.color"
            modeless
            @change="(value: any) => (config.color = value)"
          />
          <e-menus-toolbar-base-background-color
            :text="t('tools.qrcode.bgColor')"
            :default-color="config.background"
            modeless
            @change="(value: any) => (config.background = value)"
          />
        </div>
        <div class="umo-qrcode-code">
          <t-textarea
            v-model="config.content"
            maxlength="200"
            show-limit-number
            autofocus
            autosize
            :placeholder="t('tools.qrcode.placeholder')"
          >
          </t-textarea>
          <div
            v-if="renderError && config.content !== ''"
            class="umo-barcode-error"
            v-text="t('tools.qrcode.renderError')"
          ></div>
        </div>
        <div class="umo-qrcode-render">
          <div
            class="umo-qrcode-title"
            v-text="t('tools.qrcode.preview')"
          ></div>
          <div class="umo-qrcode-svg narrow-scrollbar">
            <div
              v-if="!svgCode"
              class="umo-qrcode-empty"
              v-text="t('tools.qrcode.notEmpty')"
            ></div>
            <div v-else class="umo-svg-render" v-html="svgCode"></div>
          </div>
        </div>
      </div>
    </e-modal>
  </e-menus-button>
</template>

<script setup lang="ts">

import { qrcode } from 'pure-svg-code'
import svg64 from 'svg64'

import { shortId } from '~~/editor/src/utils/short-id'

const { content } = defineProps({
  content: {
    type: String,
    default: '',
  },
})

let dialogVisible = ref(false)
const editor = inject('editor')
const container = inject('container')
const uploadFileMap = inject('uploadFileMap')
const { t, locale } = useI18n()

const menuClick = () => {
  renderQrcode()
  dialogVisible.value = true
}

const levels = [
  { label: t('tools.qrcode.levelL'), value: 'L' },
  { label: t('tools.qrcode.levelM'), value: 'M' },
  { label: t('tools.qrcode.levelQ'), value: 'Q' },
  { label: t('tools.qrcode.levelH'), value: 'H' },
]
const defaultConfig = {
  content: '',
  padding: 1,
  width: 256,
  height: 256,
  color: '#000000',
  background: '#ffffff',
  ecl: 'M',
}

let config = ref({ ...defaultConfig })
let changed = ref(false)

let svgCode = ref<string | null>(null)
let renderError = ref(false)
const renderQrcode = () => {
  try {
    svgCode.value = null
    config.value.height = config.value.width
    svgCode.value = qrcode(config.value)
    renderError.value = false
  } catch {
    svgCode.value = null
    renderError.value = true
  }
}
watch(
  () => dialogVisible.value,
  (val: boolean) => {
    if (val) {
      config.value = content ? JSON.parse(content) : { ...defaultConfig }
      setTimeout(() => {
        changed.value = false
      }, 200)
    }
  },
  { immediate: true },
)
watch(
  () => config.value,
  () => {
    if (dialogVisible.value) {
      changed.value = true
      renderQrcode()
    }
  },
  { immediate: true, deep: true },
)

// 创建或更新条形码
const setQrcode = () => {
  if (renderError.value || !svgCode.value) {
    useMessage('error', {
      attach: container,
      content: t('tools.qrcode.renderError'),
    })
    return
  }
  if (config.value.content === '') {
    useMessage('error', {
      attach: container,
      content: t('tools.qrcode.notEmpty'),
    })
    return
  }
  const id = shortId(10)
  const { width, height } = config.value
  const src = svg64(svgCode.value)
  const name = `qrcode-${id}.svg`
  const blob = new Blob([svgCode.value], {
    type: 'image/svg+xml',
  })
  const file = new File([blob], name, {
    type: 'image/svg+xml',
  })
  uploadFileMap.value.set(id, file)
  if (changed.value) {
    editor.value
      ?.chain()
      .focus()
      .setImage(
        {
          id,
          type: 'qrcode',
          name,
          size: file.size,
          src,
          content: JSON.stringify(config.value),
          width,
          height,
        },
        !!content,
      )
      .run()
  }
  dialogVisible.value = false
}
</script>

<style lang="less" scoped>
.umo-qrcode-container {
  padding: 2px;
  .umo-qrcode-toolbar {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  .umo-qrcode-code {
    margin-bottom: 10px;
    :deep(.umo-textarea__inner) {
      height: 100%;
      resize: none;
    }
    .umo-barcode-error {
      font-size: 12px;
      color: var(--umo-error-color);
    }
  }
  .umo-qrcode-render {
    border: solid 1px var(--td-border-level-2-color);
    border-radius: var(--umo-radius);
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    .umo-qrcode-title {
      background-color: var(--umo-button-hover-background);
      padding: 0 10px;
      position: absolute;
      font-size: 12px;
      border-bottom-right-radius: var(--umo-radius);
    }
    .umo-qrcode-empty {
      color: var(--umo-text-color-light);
      font-size: 12px;
      margin: 40px;
    }
    .umo-qrcode-svg {
      box-sizing: border-box;
      padding: 30px 10px;
      min-height: 100px;
      overflow: auto;
      color: var(--umo-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      > .umo-svg-render {
        border: solid 1px var(--umo-border-color-light);
        :deep(svg) {
          display: block;
          width: 256px;
          height: 256px;
        }
      }
    }
  }
}
</style>
