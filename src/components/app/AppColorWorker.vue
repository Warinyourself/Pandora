<template>
  <AppDrop
    type="color"
    class="mb-2 color-worker"
    :callback="handleDropColor"
  >
    <template v-slot:wrapper="{isActive, isFocus, dropInfo}">
      <p
        v-if="isActive && !isFocus"
        class="color-worker-wrapper-title"
      >
        put color here
      </p>
      <div v-if="dropInfo && isFocus">
        <v-row dense>
          <v-col cols="auto">
            <AppActiveBlock>
              <div class="d-flex">
                <div
                  class="color-block"
                  :style="`background-color: ${dropInfo}`"
                />
              </div>
            </AppActiveBlock>
          </v-col>
        </v-row>
      </div>
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
