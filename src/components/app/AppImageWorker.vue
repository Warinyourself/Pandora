<template>
  <AppDrop
    type="image"
    class="mb-2 color-worker image-worker"
    :is-empty="!image.src"
    :callback="handleDrop"
  >
    <template v-slot="{isActive, isFocus, dropInfo}">
      <div
        v-if="isActive"
        class="color-worker-wrapper"
      >
        put image here
      </div>
      <AppActiveBlock
        v-if="(dropInfo && isFocus) || image.src"
        :key="JSON.stringify(dropInfo || image)"
        class="image-editor"
        :style="`background-image: url(${image.src || dropInfo.src})`"
      />
    </template>
  </AppDrop>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ILoaderFile } from '@/models/page'

@Component
export default class AppImageWorker extends Vue {
  image = {}

  handleDrop(file: ILoaderFile) {
    this.image = file
  }
}
</script>
