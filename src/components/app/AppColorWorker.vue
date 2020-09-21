<template>
  <AppDrop
    type="color"
    class="mb-2 color-worker"
    :callback="handleDropColor"
  >
    <template v-slot:wrapper="{isActive, isFocus}">
      <p
        v-if="isActive || isFocus"
        class="color-worker-wrapper-title"
      >
        put color here
      </p>
    </template>
  </AppDrop>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PaletteColor } from '@/models/palette'

@Component
export default class AppColorWorker extends Vue {
  colors = [] as PaletteColor[]

  handleDropColor(color: string) {
    this.colors.push(
      {
        name: 'undefined',
        hex: color
      }
    )
  }
}
</script>
