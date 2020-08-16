<template>
  <AppContent>
    <v-text-field label="Palette name" v-model="name"/>

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
      {{isEdit ? 'Update' : 'Create'}} palette
    </v-btn>
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

  colors = [] as PaletteColor[]
  name = 'Default name'
  activeColor: PaletteColor | null = null

  get isEdit() {
    return this.palette.id
  }

  get computedPalette(): Palette {
    return {
      id: this.palette.id || getUUID(),
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
