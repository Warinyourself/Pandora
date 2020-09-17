<template>
  <AppContent>
    <v-text-field v-model="boxName" />

    <AppFileLoader
      v-model="files"
      :file-modifier="fileModifier"
    >
      <template v-slot="{file, remove}">
        <AppActiveBlock
          :menu="generateRightMenu(file, {remove})"
          @dblclick="handleDbclick(file, $event)"
        >
          <div
            :class="`app-file-loader-file app-file-loader-file--${file.type} ${file.loading ? '' : 'app-file-loader-file--loading'}`"
            :style="`${file.type === 'image' ? 'background-image: url(' + file.src + ')': ''}`"
          >
            <div
              v-if="file.loading"
              class="position-center"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              />
            </div>
            <div
              v-if="file.type === 'text'"
              class="app-file-loader-file-name"
            >
              {{ file.name }}
            </div>
          </div>
        </AppActiveBlock>
      </template>
      <template v-slot:focusFile="{file, remove}">
        <div class="d-flex fw-wrap">
          <v-tooltip
            v-for="item in generateRightMenu(file, {remove})"
            :key="item.title + 'btn'"
            bottom
          >
            <template v-slot:activator="{on}">
              <v-btn
                icon
                @click="item.callback"
                v-on="on"
              >
                <v-icon v-text="item.icon || 'mdi-pencil'" />
              </v-btn>
            </template>
            <span> {{ item.title }} </span>
          </v-tooltip>

          <div class="d-flex fw-wrap">
            <v-row dense>
              <v-col
                v-for="color in file.palette"
                :key="color"
                cols="auto"
              >
                <AppDrag
                  :info="color"
                  type="color"
                >
                  <div
                    class="color-block"
                    :style="`background-color: ${color}`"
                  />
                </AppDrag>
              </v-col>
            </v-row>
          </div>
        </div>
      </template>
    </AppFileLoader>

    <AppTextEditor
      v-if="editFile.hash"
      class="mt-4"
      :file="editFile"
    />

    <LayoutModifyPalette
      :palette="palette"
      class="mt-4"
    />

    <v-dialog
      v-model="paletteSelectionModal"
      max-width="50vmin"
    >
      <div class="block ma-0">
        <v-row>
          <v-col
            v-for="palette in palettes"
            :key="palette.key"
            cols="6"
          >
            <div
              class="block block--darken"
              @click="activatePalette(palette)"
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
            </div>
          </v-col>
        </v-row>
      </div>
    </v-dialog>

    <AppButton
      class="mt-2"
      color="primary"
      @click="saveBox"
    >
      Save box
    </AppButton>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import ModifyColor from '@/components/page/palette/ModifyColor.vue'

import { BoxModule } from '@/store/box'
import { PaletteModule } from '@/store/palette'
import LayoutModifyPalette from '@/components/page/palette/LayoutModifyPalette.vue'

// @ts-ignore
import ColorThief from 'colorthief'

import { IBox } from '@/models/box'
import { Palette, ColorsType, defaultPalette, defaultColor } from '@/models/palette'
import { ILoaderFile, IRightMenuItem } from '@/models/page'

@Component({
  components: {
    ModifyColor,
    LayoutModifyPalette
  }
})
export default class LayoutModifyBox extends Vue {
  @Prop({ type: Object }) box!: IBox

  editFile = {} as ILoaderFile

  boxName = 'Box name'

  files = [] as Array<ILoaderFile>

  palette = defaultPalette

  hex = defaultColor

  paletteSelectionModal = false

  get palettes() {
    return PaletteModule.palettes
  }

  get isEdit() {
    return this.box
  }

  get boxes() {
    return BoxModule.boxes
  }

  async mounted() {
    await PaletteModule.updatePalettes()

    if (this.box) {
      this.boxName = this.box.name
      this.files = this.box.files
    }
  }

  fileModifier(file: ILoaderFile) {
    return new Promise((resolve) => {
      if (file.type !== 'image') return resolve({})

      const image = new Image()
      image.src = file.src as string

      const colorThief = new ColorThief()

      const rgbToHex = (color: string) => {
        const [r, g, b] = color
        return `#${[r, g, b].map((x) => {
          const hex = parseInt(x).toString(16)
          return hex.length === 1 ? `0${hex}` : hex
        }).join('')}`
      }

      image.addEventListener('load', async() => {
        const palette = (await colorThief.getPalette(image)).map(rgbToHex)

        resolve({ palette })
      })
    })
  }

  async saveBox() {
    await this.$db.put('box', {
      name: this.boxName,
      files: this.files
    })

    this.$router.push({ name: 'Box' })
  }

  handleDbclick(file: ILoaderFile, event: Event) {
    if (file.type === 'text') {
      this.editFile = file
    } else if (file.type === 'image') {
      this.generatePalette(file)
    }

    event.preventDefault()
    event.stopPropagation()
  }

  activatePalette(palette: Palette) {
    this.palette = palette
  }

  async generateUpdateFileFunction(file: ILoaderFile) {
    const box = await this.$db.get<IBox>('box', this.boxName)
    const notifySuccess = () => {
      this.$alert({
        type: 'success',
        title: 'File successfully saved',
        emoji: '💾'
      })
    }
    const notifyError = () => {
      this.$alert({
        type: 'error',
        title: 'Already loaded',
        text: 'File already loaded'
      })
    }

    if (!box) {
      await this.$db.put('box', {
        name: this.boxName,
        files: [file]
      })

      return notifySuccess()
    }

    const hasInDB = box.files.find(({ hash }) => hash === file.hash)

    if (!hasInDB) {
      box.files.push(file)

      await this.$db.put('box', box)

      return notifySuccess()
    } else {
      return notifyError()
    }
  }

  generatePalette(file: ILoaderFile) {
    const generateError = () => {
      this.$alert({
        type: 'error',
        title: 'Failed',
        text: 'Failed to generate palette'
      })
    }

    if (!file.palette) {
      return generateError()
    }

    const fullColors = file.palette.map((hex) => PaletteModule.hexToHsl(hex))
    const bg = fullColors.find(([, , l]) => l <= 30)
    const [primary, secondary, tertiary] = fullColors.filter(([, , l]) => l >= 60 && l <= 80)

    if (!bg || !primary || !secondary || !tertiary) {
      return generateError()
    }

    const finalColors = {
      bg, primary, secondary, tertiary
    }
    this.palette.colors = Object.entries<[number, number, number]>(finalColors).map(([name, hsl]) => ({
      name: name as ColorsType,
      hex: PaletteModule.hslToHex(hsl)
    }))
  }

  generateRightMenu(file: ILoaderFile, { remove }: Record<string, Function>): IRightMenuItem[] {
    const fileOptions = [
      {
        title: 'Delete',
        icon: 'mdi-trash-can-outline',
        callback: () => remove(file)
      },
      {
        title: 'Save file',
        icon: 'mdi-content-save',
        callback: () => this.generateUpdateFileFunction(file)
      }
    ]

    if (file.palette) {
      fileOptions.push({
        title: 'Generate palette',
        icon: 'mdi-cog-sync-outline',
        callback: () => this.generatePalette(file)
      })
    }

    if (file.type === 'image') {
      return fileOptions.concat([
        {
          title: 'Set as background',
          icon: 'mdi-share',
          callback: () => {
            this.$electron?.ipcRenderer.send('sendCommand', { command: 'nitrogen', attrs: ['--set-auto', file.path] })
          }
        }
      ])
    }

    return fileOptions.concat([
      {
        title: 'Set to edit',
        icon: 'mdi-pencil',
        callback: () => {
          this.editFile = file
        }
      }
    ])
  }
}
</script>

<style lang="stylus"></style>
