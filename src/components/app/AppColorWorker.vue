<template>
  <AppDrop
    type="color"
    class="mb-2 color-worker"
    :is-empty="!colors.length"
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

    <v-row
      v-if="colors.length"
      dense
    >
      <v-col
        v-for="color in colors"
        :key="JSON.stringify(color)"
        cols="auto"
      >
        <AppActiveBlock>
          <div class="d-flex">
            <div
              class="color-block"
              :style="`background-color: ${color.hex}`"
            />
          </div>
        </AppActiveBlock>
      </v-col>
      <v-col cols="auto">
        <AppActiveBlock @click="createColor">
          <div class="d-flex">
            <div
              class="color-block c-pointer"
              :style="`background-color: var(--v-bg-base)`"
            >
              <v-icon size="25">
                mdi-plus
              </v-icon>
            </div>
          </div>
        </AppActiveBlock>
      </v-col>
    </v-row>
  </AppDrop>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PaletteColor, defaultColor } from '@/models/palette'

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

  createColor() {
    const color: PaletteColor = {
      name: 'primary',
      hex: defaultColor
    }

    this.colors.push(color)
  }
}
</script>
