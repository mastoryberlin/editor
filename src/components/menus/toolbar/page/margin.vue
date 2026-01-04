<template>
  <e-menus-button
    ico="page-margin"
    :text="$t('page.margin')"
    huge
    @menu-click="dialogVisible = true"
  >
    <e-page-options :visible="dialogVisible" @close="dialogVisible = false" />
  </e-menus-button>
</template>

<script setup lang="ts">

const dialogVisible = ref(false)
</script>
