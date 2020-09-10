<template>
  <AppContent>
    <AppBlock>
      <h2 class="title">
        {{ !palettes.length ? 'Set up palette' : 'Here you may create a palette' }}
      </h2>
      <AppLoader :is-loading="isLoading">
        <v-row>
          <v-col
            v-for="palette in palettes"
            :key="palette.key"
            cols="4"
          >
            <AppActiveBlock
              :menu="generateMenu(palette)"
            >
              <router-link
                class="block block--darken"
                :to="{name: 'PaletteEdit', params: {id: palette.name}}"
              >
                <h3> {{ palette.name }} </h3>
                <div class="d-flex">
                  <div
                    v-for="color in palette.colors"
                    :key="color.name"
                    class="color-block"
                    :style="`background-color: ${color.hex}`"
                  />
                </div>
              </router-link>
            </AppActiveBlock>
          </v-col>
        </v-row>
      </AppLoader>
      <v-btn
        color="primary"
        :to="{name: 'PaletteCreate'}"
      >
        Create new palette
      </v-btn>
    </AppBlock>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PaletteModule } from '@/store/palette'
import { Palette } from '@/models/palette'

@Component
export default class PalettePage extends Vue {
  isLoading = true

  get palettes() {
    return PaletteModule.palettes
  }

  get nameActivePalette() {
    return PaletteModule.nameActivePalette
  }

  async mounted() {
    this.isLoading = true
    await PaletteModule.updatePalettes()
    this.isLoading = false
  }

  generateMenu(palette: Palette) {
    const menu = []
    const isAlreadyActive = this.nameActivePalette === palette.name

    menu.push({
      title: 'Activate palette',
      disabled: isAlreadyActive,
      callback: () => {
        PaletteModule.activatePalette({ palette, self: this })
      }
    })

    return menu
  }
}
</script>
