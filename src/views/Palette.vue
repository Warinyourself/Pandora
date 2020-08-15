<template>
  <AppContent>
    <AppBlock>
      <h2 class="title">
        {{ !palettes.length ? 'Set up palette' : 'Here you may create a palette'}}
      </h2>
      <v-row>
        <v-col cols="4"
          v-for="palette in palettes"
          :key="palette.key"
        >
          <AppActiveBlock
            :menu="generateMenu(palette)"
          >
            <div class="block block--bg">
              <h3> {{ palette.name }} </h3>
              <div class="d-flex">
                <div
                  class="color-block"
                  :style="`background-color: ${color.hex}`"
                  v-for="color in palette.colors"
                  :key="color.name"
                />
              </div>
            </div>
          </AppActiveBlock>
        </v-col>
      </v-row>
    </AppBlock>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PaletteModule } from '@/store/palette'
// eslint-disable-next-line no-unused-vars
import { Palette } from '@/models/palette'

@Component
export default class PalettePage extends Vue {
  get palettes() {
    return PaletteModule.palettes
  }

  async mounted() {
    await PaletteModule.updatePalettes()
  }

  generateMenu(palette: Palette) {
    return [
      {
        title: 'Activate palette',
        callback: () => {
          PaletteModule.activatePalette({ palette, self: this })
        }
      },
    ]
  }
}
</script>
