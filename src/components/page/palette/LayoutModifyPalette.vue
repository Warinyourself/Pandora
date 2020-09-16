<template>
  <div class="palette-modify">
    <AppBlock>
      <v-text-field
        v-model="name"
        label="Palette name"
      />
      <h2 class="title">
        Create colors
      </h2>

      <AppDrop
        type="color"
        class="mb-2"
        :callback="handleDropColor"
      >
        <v-row dense>
          <v-col
            v-for="color in colors"
            :key="JSON.stringify(color)"
            cols="auto"
          >
            <AppActiveBlock
              @click="handleClickColor(color)"
            >
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

      <v-expand-transition>
        <div v-show="activeColor">
          <v-row>
            <v-col>
              <!-- v-model="activeColor ? activeColor.hex : empty" -->
              <v-color-picker
                :value="activeColor ? activeColor.hex : '#da0463'"
                class="ma-2"
                dot-size="10"
                width="400px"
              />
            </v-col>
            <v-col>
              <!-- v-model="activeColor.name" -->
              <v-select
                :value="activeColor && activeColor.name"
                :items="['primary', 'secondary', 'tertiary', 'fg', 'bg']"
                label="Set color type"
              />
              <v-btn
                color="primary"
                @click="deleteActiveColor"
              >
                Delete color
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-expand-transition>

      <v-row dense>
        <v-col cols="auto">
          <v-btn
            color="primary"
            @click="createPalette"
          >
            {{ isEdit ? 'Update' : 'Save' }} palette
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
    </AppBlock>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PaletteModule } from '@/store/palette'
import { Palette, PaletteColor, defaultColor } from '@/models/palette'
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
      colors: this.colors.map((color) => {
        color.hex = color.hex.replace(/FF$/, '')

        return color
      })
    }
  }

  mounted() {
    if (this.isEdit) {
      this.name = this.palette.name
      this.colors = this.palette.colors

      // this.activeColor = this.colors[0]
    }
  }

  async exportToJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(this.computedPalette))

      this.$alert({
        type: 'success',
        title: 'Successful save'
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleClickColor(color: PaletteColor) {
    if (JSON.stringify(color) === JSON.stringify(this.activeColor)) {
      this.activeColor = null
    } else {
      this.activeColor = color
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

      this.$alert({
        type: 'success',
        title: 'Successful export'
      })
    } catch (error) {
      console.error(error)
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

  deleteActiveColor() {
    this.colors = this.colors.filter((color) => JSON.stringify(color) !== JSON.stringify(this.activeColor))

    this.activeColor = this.colors[0]
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
