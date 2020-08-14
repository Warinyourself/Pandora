<template>
  <AppContent>
    <AppBlock>
      <h2 class="title">
        {{ !palettes.length ? 'Set up palette' : 'Here you may create a palette'}}
      </h2>
      <AppActiveBlock
        :menu="generateMenu(palette)"
        v-for="palette in palettes"
        :key="palette.key"
      >
        <AppBlock second>
          <h3> {{ palette.name }} </h3>
        </AppBlock>
      </AppActiveBlock>
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
    console.log(PaletteModule)
    await PaletteModule.setPalettes()
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
