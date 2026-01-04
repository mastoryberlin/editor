<template>
  <div class="umo-ribbon-menu">
    <div v-if="menus.length > 1" class="umo-ribbon-tabs">
      <div
        v-for="item in menus"
        :key="item.value"
        class="umo-ribbon-tabs-item"
        :class="{ active: currentMenu === item.value }"
        @click="changeMenu(item.value)"
      >
        {{ item.label }}
      </div>
    </div>
    <e-toolbar-scrollable ref="scrollableRef" class="umo-scrollable-container">
      <div class="umo-ribbon-container">
        <template v-if="currentMenu === 'base'">
          <div class="umo-virtual-group">
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-base-undo />
              <e-menus-toolbar-base-redo />
            </div>
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-base-format-painter />
              <e-menus-toolbar-base-clear-format />
            </div>
          </div>
          <div class="umo-virtual-group">
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-base-font-family />
              <e-menus-toolbar-base-font-size />
            </div>
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-base-bold />
              <e-menus-toolbar-base-italic />
              <e-menus-toolbar-base-underline />
              <e-menus-toolbar-base-strike />
              <e-menus-toolbar-base-subscript />
              <e-menus-toolbar-base-superscript />
              <e-menus-toolbar-base-color />
              <e-menus-toolbar-base-background-color />
              <e-menus-toolbar-base-highlight v-if="!disableMenu('highlight')" />
            </div>
          </div>
          <div class="umo-virtual-group">
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-base-ordered-list
                v-if="!disableMenu('ordered-list')"
              />
              <e-menus-toolbar-base-bullet-list
                v-if="!disableMenu('bullet-list')"
              />
              <e-menus-toolbar-base-task-list v-if="!disableMenu('task-list')" />
              <e-menus-toolbar-base-indent />
              <e-menus-toolbar-base-outdent />
              <e-menus-toolbar-base-line-height
                v-if="!disableMenu('line-height')"
              />
              <e-menus-toolbar-base-margin v-if="!disableMenu('margin')" />
            </div>
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-base-align-left />
              <e-menus-toolbar-base-align-center />
              <e-menus-toolbar-base-align-right />
              <e-menus-toolbar-base-align-justify />
              <e-menus-toolbar-base-align-distributed />
              <e-menus-toolbar-base-quote v-if="!disableMenu('quote')" />
              <e-menus-toolbar-base-code v-if="!disableMenu('code')" />
              <e-menus-toolbar-base-select-all
                v-if="!disableMenu('select-all')"
              />
            </div>
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-base-heading />
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-base-import-word
              v-if="!disableMenu('import-word')"
            />
            <e-menus-toolbar-base-markdown v-if="!disableMenu('markdown')" />
            <e-menus-toolbar-base-search-replace />
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-base-viewer v-if="!disableMenu('viewer')" />
            <e-menus-toolbar-base-print v-if="!disableMenu('print')" />
          </div>
          <div class="virtual-group is-slot">
            <slot name="toolbar_base" toolbar-mode="ribbon" ></slot>
          </div>
        </template>
        <template v-if="currentMenu === 'insert'">
          <div class="umo-virtual-group">
            <e-menus-toolbar-insert-link v-if="!disableMenu('link')" />
            <e-menus-toolbar-insert-image v-if="!disableMenu('image')" />
            <e-menus-toolbar-insert-video v-if="!disableMenu('video')" />
            <e-menus-toolbar-insert-audio v-if="!disableMenu('audio')" />
            <e-menus-toolbar-insert-file v-if="!disableMenu('file')" />
            <e-menus-toolbar-insert-code-block
              v-if="!disableMenu('code-block')"
            />
            <e-menus-toolbar-insert-symbol v-if="!disableMenu('symbol')" />
            <e-menus-toolbar-insert-chinese-date
              v-if="!disableMenu('chinese-date')"
            />
            <e-menus-toolbar-insert-emoji v-if="!disableMenu('emoji')" />
            <e-menus-toolbar-insert-math v-if="!disableMenu('math')" />
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-insert-tag v-if="!disableMenu('tag')" />
            <e-menus-toolbar-insert-columns v-if="!disableMenu('columns')" />
            <e-menus-toolbar-insert-callout v-if="!disableMenu('callout')" />
            <e-menus-toolbar-insert-mention v-if="!disableMenu('mention')" />
            <e-menus-toolbar-insert-bookmark v-if="!disableMenu('bookmark')" />
            <e-menus-toolbar-insert-option-box
              v-if="!disableMenu('option-box')"
            />
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-insert-hard-break
              v-if="!disableMenu('hard-break')"
            />
            <e-menus-toolbar-insert-hr v-if="!disableMenu('hr')" />
            <e-menus-toolbar-insert-toc v-if="!disableMenu('toc')" />
            <e-menus-toolbar-insert-text-box v-if="!disableMenu('text-box')" />
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-insert-template v-if="!disableMenu('template')" />
            <e-menus-toolbar-insert-web-page v-if="!disableMenu('web-page')" />
          </div>
          <div class="virtual-group is-slot">
            <slot name="toolbar_insert" toolbar-mode="ribbon" ></slot>
          </div>
        </template>
        <template v-if="currentMenu === 'table'">
          <div class="umo-virtual-group">
            <e-menus-toolbar-table-insert />
            <e-menus-toolbar-table-fix />
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-table-cells-align />
            <e-menus-toolbar-table-cells-background />
            <!-- <e-menus-toolbar-table-border-color /> -->
          </div>
          <div class="umo-virtual-group">
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-table-add-row-before />
              <e-menus-toolbar-table-add-row-after />
              <e-menus-toolbar-table-delete-row />
            </div>
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-table-add-column-before />
              <e-menus-toolbar-table-add-column-after />
              <e-menus-toolbar-table-delete-column />
            </div>
          </div>
          <div class="umo-virtual-group">
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-table-merge-cells />
            </div>
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-table-split-cell />
            </div>
          </div>
          <div class="umo-virtual-group">
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-table-toggle-header-row />
              <e-menus-toolbar-table-toggle-header-column />
            </div>
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-table-toggle-header-cell />
            </div>
          </div>
          <div class="umo-virtual-group">
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-table-next-cell />
            </div>
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-table-previous-cell />
            </div>
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-table-delete />
          </div>
          <div class="virtual-group is-slot">
            <slot name="toolbar_table" toolbar-mode="ribbon" ></slot>
          </div>
        </template>
        <template v-if="currentMenu === 'tools'">
          <div class="umo-virtual-group">
            <e-menus-toolbar-tools-qrcode v-if="!disableMenu('qrcode')" />
            <e-menus-toolbar-tools-barcode v-if="!disableMenu('barcode')" />
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-tools-signature v-if="!disableMenu('signature')" />
            <e-menus-toolbar-tools-seal v-if="!disableMenu('seal')" />
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-tools-diagrams v-if="!disableMenu('diagrams')" />
            <e-menus-toolbar-tools-echarts v-if="!disableMenu('echarts')" />
            <!-- <e-menus-toolbar-tools-mind-map v-if="!disableMenu('mind-map')" /> -->
            <e-menus-toolbar-tools-mermaid v-if="!disableMenu('mermaid')" />
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-tools-chinese-case
              v-if="!disableMenu('chinese-case')"
            />
          </div>
          <div class="umo-virtual-group">
            <slot name="toolbar_tools" toolbar-mode="ribbon" ></slot>
          </div>
        </template>
        <template v-if="currentMenu === 'page'">
          <div class="umo-virtual-group">
            <e-menus-toolbar-page-toggle-toc />
          </div>
          <div class="umo-virtual-group">
            <div class="umo-virtual-group-row">
              <e-menus-toolbar-page-margin />
              <div>
                <div class="umo-virtual-group-row">
                  <e-menus-toolbar-page-size v-if="page.layout === 'page'" />
                </div>
                <div class="umo-virtual-group-row">
                  <e-menus-toolbar-page-orientation
                    v-if="page.layout === 'page'"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-page-break />
            <e-menus-toolbar-page-break-marks />
            <e-menus-toolbar-page-line-number />
            <e-menus-toolbar-page-watermark v-if="!disableMenu('watermark')" />
            <e-menus-toolbar-page-background v-if="!disableMenu('background')" />
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-page-preview v-if="!disableMenu('preview')" />
          </div>
          <div class="virtual-group is-slot">
            <slot name="toolbar_page" toolbar-mode="ribbon" ></slot>
          </div>
        </template>
        <template v-if="currentMenu === 'export'">
          <div class="umo-virtual-group">
            <e-menus-toolbar-export-image v-if="!disableMenu('export-image')" />
            <e-menus-toolbar-export-pdf v-if="!disableMenu('export-pdf')" />
            <e-menus-toolbar-export-text v-if="!disableMenu('export-text')" />
          </div>
          <div class="umo-virtual-group">
            <e-menus-toolbar-export-share v-if="!disableMenu('share')" />
            <e-menus-toolbar-export-embed v-if="!disableMenu('embed')" />
          </div>
          <div class="virtual-group is-slot">
            <slot name="toolbar_export" toolbar-mode="ribbon" ></slot>
          </div>
        </template>
      </div>
    </e-toolbar-scrollable>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  menus: {
    value: string
    label: string
  }[]
  currentMenu: string
}>()
const emits = defineEmits(['menu-change'])

const options = inject('options')
const page = inject('page')
const disableMenu = (name: string) => {
  return options.value.disableExtensions.includes(name)
}

const scrollableRef = ref<{ update: () => void }>()
const changeMenu = async (menu: string) => {
  emits('menu-change', menu)
  await nextTick()
  scrollableRef.value?.update()
}
</script>

<style lang="less" scoped>
.umo-ribbon-menu {
  width: 100%;
}
.umo-ribbon-tabs {
  padding: 10px 10px 0;
  display: flex;
  &-item {
    font-size: var(--umo-font-size-small);
    margin-right: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: column;
    &:hover {
      font-weight: 600;
      &::after {
        display: block;
        content: '';
        height: 3px;
        width: 100%;
        margin-top: 5px;
        background-color: var(--umo-border-color);
      }
    }
    &.active {
      color: var(--umo-primary-color);
      font-weight: 600;
      &::after {
        display: block;
        content: '';
        height: 3px;
        width: 100%;
        margin-top: 5px;
        background-color: var(--umo-primary-color);
        transition: width 0.3s;
      }
      &:hover::after {
        width: 120%;
      }
    }
    @media screen and (max-width: 640px) {
      margin-right: 10px;
    }
  }
}
.umo-scrollable-container {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.umo-ribbon-container {
  display: flex;
  height: 56px;
  flex-shrink: 0;
  .umo-virtual-group {
    padding: 0 20px;
    border-left: solid 1px var(--umo-border-color-light);
    flex-shrink: 0;
    &:empty {
      display: none;
    }
    &:first-child {
      padding-left: 0;
    }
    &:first-child,
    &.is-slot:empty {
      border-left: none;
    }
    &-row {
      display: flex;
      align-items: center;
      :deep(> *:not(:last-child)) {
        margin-right: 5px;
      }
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
