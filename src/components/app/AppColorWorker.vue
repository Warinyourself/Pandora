<template>
  <AppDrop
    type="color"
    class="mb-2 color-worker"
    :is-empty="!colors.length"
    :callback="handleDropColor"
  >
    <template v-slot="{isActive, isFocus, dropInfo}">
      <div
        v-if="isActive"
        class="color-worker-wrapper"
      >
        put color here
      </div>
      <fade-transition
        tag="div"
        class="d-flex color-worker-body"
        :group="true"
      >
        <AppActiveBlock
          v-for="color in colors"
          :key="JSON.stringify(color)"
        >
          <div
            class="color-block"
            :style="`background-color: ${color.hex}`"
          />
        </AppActiveBlock>
        <AppActiveBlock
          v-if="dropInfo && isFocus"
          :key="JSON.stringify(dropInfo)"
          class="disable-transition"
        >
          <div
            class="color-block"
            :style="`background-color: ${dropInfo}`"
          />
        </AppActiveBlock>
        <AppActiveBlock
          key="plus"
          @click="createColor"
        >
          <div
            class="color-block c-pointer"
            :style="`background-color: var(--v-bg-base)`"
          >
            <v-icon size="25">
              mdi-plus
            </v-icon>
          </div>
        </AppActiveBlock>
      </fade-transition>
    </template>
  </AppDrop>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PaletteColor, defaultColor } from '@/models/palette'

@Component
export default class AppColorWorker extends Vue {
  @Prop({ type: Array }) value!: PaletteColor[]

  colors = [] as PaletteColor[]

  mounted() {
    if (this.value) {
      this.colors = this.value
    }
  }

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
