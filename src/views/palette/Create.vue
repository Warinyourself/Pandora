<template>
  <AppContent>
    <v-text-field label="Palette name" v-model="name">

    </v-text-field>

    <AppBlock>
      <h2 class="title"> Create colors </h2>
      <v-row>
        <v-col
          cols="auto"
          v-for="color in colors"
          :key="color.name"
        >
          <AppActiveBlock
            @click="activeColor = color"
          >
            <div class="d-flex">
              <div
                class="color-block ma-0"
                :style="`background-color: ${color.hex}`"
              />
            </div>
          </AppActiveBlock>
        </v-col>
      </v-row>
      <v-btn
        color="primary"
        @click="createColor"
      >
        Create color
      </v-btn>
    </AppBlock>
    <AppBlock v-if="activeColor">
      <v-row>
        <v-col>
          <v-color-picker
            class="ma-2"
            v-model="activeColor.hex"
            dot-size="10"
            width="400px"
          ></v-color-picker>
            </v-col>
            <v-col>
          <v-select
            :items="['primary', 'secondary', 'tertiary', 'fg', 'bg' ]"
            v-model="activeColor.name"
            label="Set color type"
          >
          </v-select>
        </v-col>
      </v-row>
    </AppBlock>
    <v-btn
      color="primary"
      @click="createPalette"
    >
      Create palette
    </v-btn>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PaletteModule } from '@/store/palette'
// eslint-disable-next-line no-unused-vars
import { Palette, PaletteColor } from '@/models/palette'
import { defaultColor } from '@/models/palette'

@Component
export default class PalettePage extends Vue {
  colors = [] as PaletteColor[]
  name = 'Default name'
  activeColor: PaletteColor | null = null

  get computedPalette(): Palette {
    return {
      id: Math.random() + '',
      name: this.name,
      colors: this.colors.map(color => {
        color.hex = color.hex.replace(/FF$/, '')

        return color
      })
    }
  }

  createColor() {
     const color: PaletteColor = {
       name: null,
       hex: defaultColor
     }

     this.colors.push(color)
     this.activeColor = color
  }

  async createPalette() {
    await PaletteModule.putPalette(this.computedPalette)

    this.$router.push({ name: 'Palette' })
  }
}
</script>
