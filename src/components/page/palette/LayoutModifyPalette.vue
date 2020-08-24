<template>
  <AppContent>
    <v-text-field label="Palette name" v-model="name"/>

    <AppBlock>
      <h2 class="title"> Create colors </h2>
      <v-row dense class="mb-2">
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
    <v-row dense>
      <v-col cols="auto">
        <v-btn
          color="primary"
          @click="createPalette"
        >
          {{isEdit ? 'Update' : 'Save'}} palette
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          color="primary"
          @click="exportToJson"
        >
          Export palette to JSON
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          color="primary"
          @click="importPalette"
        >
          Import palette from clipboard
        </v-btn>
      </v-col>
    </v-row>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { PaletteModule } from '@/store/palette'
// eslint-disable-next-line no-unused-vars
import { Palette, PaletteColor } from '@/models/palette'
import { defaultColor } from '@/models/palette'
import { getUUID } from '@/utils/helper'

@Component
export default class LayoutModifyPalette extends Vue {
  @Prop({ type: Object, default: () => ({}) }) palette!: Palette

  id = getUUID()
  name = 'Default name'
  colors = [] as PaletteColor[]
  activeColor: PaletteColor | null = null

  get isEdit() {
    return this.palette.id
  }

  get computedPalette(): Palette {
    return {
      id: this.palette.id || this.id,
      name: this.name,
      colors: this.colors.map(color => {
        color.hex = color.hex.replace(/FF$/, '')

        return color
      })
    }
  }

  mounted() {
    if (this.isEdit) {
      this.name = this.palette.name
      this.colors = this.palette.colors

      this.activeColor = this.colors[0]
    }
  }

  async exportToJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(this.computedPalette))

      alert('Successful save')
    } catch (error) {
      console.error(error)
    }
  }

  async importPalette() {
    try {
      const info = JSON.parse(await navigator.clipboard.readText()) as Palette
      let { id, name, colors } = info
      
      colors = colors.filter(({ hex, name }) => hex && name)

      this.id = id
      this.name = name
      this.colors = colors

      this.activeColor = this.colors[0]
      alert('Successful export')
    } catch (error) {
      console.error(error)
    }
  }

  createColor() {
     const color: PaletteColor = {
       name: 'primary',
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
