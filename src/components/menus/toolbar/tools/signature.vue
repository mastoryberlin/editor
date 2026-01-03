<template>
  <e-menus-button
    ico="signature"
    :text="t('tools.signature.text')"
    huge
    @menu-click="dialogVisible = true"
  >
    <e-modal
      v-model:visible="dialogVisible"
      width="642px"
      @confirm="setSignature"
      @close="dialogVisible = false"
    >
      <template #header>
        <EIcon name="signature" />
        {{ t('tools.signature.title') }}
      </template>
      <div class="umo-signature-toolbar">
        <e-menus-button
          ico="undo"
          :text="t('base.undo')"
          hide-text
          @menu-click="signature?.undo()"
        />
        <e-menus-button
          ico="clear-format"
          :text="t('tools.signature.clear')"
          hide-text
          @menu-click="signature?.clear()"
        />
        <t-divider layout="vertical" />
        <e-menus-button
          :text="t('tools.signature.lineWidth')"
          menu-type="dropdown"
          hide-text
          :select-options="lineWidthOptions"
          @click="changeLineWidth"
        >
          <EIcon name="highlight" />
        </e-menus-button>
        <e-menus-toolbar-base-color
          :text="t('tools.signature.lineColor')"
          modeless
          :default-color="options.color"
          @change="changeLineColor"
        />
        <e-menus-button
          :text="t('tools.signature.smooth')"
          :menu-active="openSmooth"
          hide-text
          @menu-click="changeSmooth"
        >
          <EIcon name="highlight" />
        </e-menus-button>
        <t-divider layout="vertical" />
        <e-menus-button
          ico="image-reset"
          :text="t('tools.signature.reset')"
          hide-text
          @menu-click="reuseOptions"
        />
      </div>
      <div class="umo-signature-container" :data-tip="t('tools.signature.tip')">
        <canvas ref="signatureRef" />
      </div>
    </e-modal>
  </e-menus-button>
</template>

<script setup lang="ts">

import SmoothSignature from 'smooth-signature'

import { shortId } from '~~/editor/src/utils/short-id'

const editor = inject('editor')
const container = inject('container')
const uploadFileMap = inject('uploadFileMap')
let dialogVisible = ref(false)
let openSmooth = ref(false)

const lineWidthOptions = ref([
  { content: '2', value: 2 },
  { content: '3', value: 3 },
  { content: '4', value: 4 },
  { content: '5', value: 5 },
  { content: '6', value: 6 },
  { content: '7', value: 7 },
  { content: '8', value: 8 },
])
const options = ref({
  width: 600,
  height: 200,
  minWidth: 4,
  maxWidth: 4,
  color: '#000',
  openSmooth: openSmooth.value,
  scale: 2,
})
let signature = ref(null)
const signatureRef = ref(null)

const reuseOptions = () => {
  signature.value.width = 600
  signature.value.height = 200
  signature.value.minWidth = 4
  signature.value.maxWidth = 4
  signature.value.color = '#000'
  signature.value.openSmooth = false
  openSmooth.value = false
}

const changeLineColor = (color: string) => {
  signature.value.color = color
}
const changeLineWidth = ({ value }: { value: number }) => {
  signature.value.minWidth = value
  signature.value.maxWidth = value
}
const changeSmooth = () => {
  openSmooth.value = !openSmooth.value
  signature.value.openSmooth = openSmooth.value
  signature.value.maxWidth = openSmooth.value ? signature.value.minWidth * 2 : signature.value.minWidth
}

const setSignature = async () => {
  try {
    const id = shortId(10)
    const name = `seal-${id}.png`
    const image = signature.value.getPNG()
    const file = await fetch(image)
      .then((res) => res.blob())
      .then((blob) => new File([blob], name, { type: blob.type }))
    uploadFileMap.value.set(id, file)
    editor.value
      ?.chain()
      .focus()
      .setImage({
        id,
        type: 'signature',
        name,
        src: image ?? '',
        size: file.size,
        width: 120,
        height: 40,
        draggable: true,
        previewType: null,
      })
      .run()
    dialogVisible.value = false
  } catch {
    useMessage('error', {
      attach: container,
      content: t('tools.signature.notEmpty'),
    })
  }
}

watch(
  () => dialogVisible.value,
  async (val: any) => {
    if (val) {
      if (!signature.value) {
        await nextTick()
        signature.value = new SmoothSignature(signatureRef.value, options.value)
      }
    } else {
      signature.value?.clear()
      signature.value = null
    }
  },
  { immediate: true },
)
</script>

<style lang="less" scoped>
.umo-signature-toolbar {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.umo-signature-container {
  border: solid 1px var(--umo-primary-color);
  box-sizing: border-box;
  border-radius: var(--umo-radius);
  overflow: hidden;
  position: relative;
  display: flex;
  &::before {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    content: attr(data-tip);
    align-items: center;
    justify-content: center;
    z-index: 1;
    color: var(--umo-text-color-light);
    opacity: 0.5;
    pointer-events: none;
  }
  canvas {
    width: 600px;
    height: 200px;
  }
}
</style>
