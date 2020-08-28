<template>
  <AppContent>
    <v-text-field v-model="boxName"></v-text-field>

    <AppFileLoader v-model="files" :file-modifier="fileModifier">
      <template v-slot="{ file, remove }">
        <AppActiveBlock          
          :menu="generateRightMenu(file, { remove })"
        >
          <div
            :class="`app-file-loader-file app-file-loader-file--${file.type}`"
            :style="`${file.type === 'image' ? 'background-image: url(' + file.src + ')': ''}`"
          >
            <div class="app-file-loader-file-name" v-if="file.type === 'text'"> {{ file.name }} </div>
          </div>
        </AppActiveBlock>
      </template>
      <template v-slot:focusFile="{ file, remove }">
        <div class="d-flex fw-wrap">
          <v-tooltip
            v-for="item in generateRightMenu(file, { remove })"
            :key="item.title + 'btn'"
            bottom
          >
            <template v-slot:activator="{on}">
              <v-btn
                @click="item.callback"
                v-on="on"
                icon
              >
                <v-icon v-text="item.icon || 'mdi-pencil'"></v-icon>
              </v-btn>
            </template>
            <span> {{ item.title }} </span>
          </v-tooltip>

          <div class="d-flex fw-wrap">
            <AppGrag 
              :key="color"
              :info="color"
              type="color"
              v-for="color in file.palette"
            >
              <div
                class="color-block d-flex" 
                :style="`background-color: ${color}`"
              />
            </AppGrag>
          </div>
        </div>
      </template>
    </AppFileLoader>
  
    <LayoutModifyPalette :palette="palette" class="mt-4"/>

    <v-dialog
      v-model="paletteSelectionModal"
      max-width="50vmin"
    >
      <div class="block ma-0">
        <v-row>
          <v-col cols="6"
            v-for="palette in palettes"
            :key="palette.key"
          >
            <div
              class="block block--darken"
              @click="activatePalette(palette)"
            >
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
          </v-col>
        </v-row>
      </div>
    </v-dialog>

    <div
      v-if="editFile.hash"
      class="block edit-file"
    >
      <pre>
        {{ editFile }}
      </pre>
    </div>

    <AppButton
      @click="saveBox"
      class="mt-2"
      color="primary"
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

let ipcRenderer: Electron.IpcRenderer

const userAgent = navigator.userAgent.toLowerCase();
const isElectron = userAgent.indexOf(' electron/') > -1

if (isElectron) {
  const obj = window.require('electron')

  ipcRenderer = obj.ipcRenderer
}

// @ts-ignore
import ColorThief from 'colorthief'
import { defaultPalette, defaultColor } from '@/models/palette'

// eslint-disable-next-line no-unused-vars
import { Box } from '@/models/box'
// eslint-disable-next-line no-unused-vars
import { Palette, PaletteColor, ColorsType } from '@/models/palette'
// eslint-disable-next-line no-unused-vars
import { LoaderFile, RightMenuItem } from '@/models/page'
// eslint-disable-next-line no-unused-vars
import { Color } from 'vuetify/lib/util/colors'

@Component({
  components: {
    ModifyColor,
    LayoutModifyPalette
  }
})
export default class LayoutModifyBox extends Vue {
  @Prop({ type: Object }) box!: Box

  editFile = {} as LoaderFile
  boxName = 'Box name'
  files = [] as Array<LoaderFile>

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

  fileModifier(file: LoaderFile) {
    return new Promise((resolve) => {
      if (file.type !== 'image') return resolve({})

      const image = new Image()
      image.src = file.src as string
  
      const colorThief = new ColorThief();
  
      const rgbToHex = (color: string) => {
        const [r, g, b] = color
        return '#' + [r, g, b].map(x => {
          const hex = parseInt(x).toString(16)
          return hex.length === 1 ? '0' + hex : hex
        }).join('')
      }
  
      image.addEventListener('load', async () => {
        let palette = (await colorThief.getPalette(image)).map(rgbToHex)

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

  activatePalette(palette: Palette) {
    this.palette = palette
  }

  generateUpdateFileFunction(file: LoaderFile) {
    return async () => {
      const box = await this.$db.get('box', this.boxName) as Box

      if (!box) {
        await this.$db.put('box', {
          name: this.boxName,
          files: [file]
        })
        return
      }

      const hasInDB = box.files.find(({ hash }) => hash === file.hash)

      if (!hasInDB) {
        box.files.push(file)

        await this.$db.put('box', box)
      } else {
        alert('already in indexdb')
      }
    }
  }

  generateRightMenu(file: LoaderFile, { remove }: Record<string, Function> ): RightMenuItem[] {
    const fileOptions = [
      {
        title: 'Delete',
        icon: 'mdi-trash-can-outline',
        callback: () => remove(file)
      },
      {
        title: 'Save file',
        icon: 'mdi-content-save',
        callback: this.generateUpdateFileFunction(file)
      }
    ]

    if (file.palette) {
      fileOptions.push({
        title: 'Generate palette',
        icon: 'mdi-cog-sync-outline',
        callback: () => {
          const fullColors = file.palette.map(hex => {
            return PaletteModule.hexToHsl(hex)
          })
          const bg = fullColors.find(([, , l]) => l <= 30)
          const [primary, secondary, tertiary] = fullColors.filter(([, , l]) => l >= 60 && l <= 80)


          if (!bg || !primary || !secondary || !tertiary) {
            alert('Failed to generate palette')
            return
          }

          const finalColors = { bg, primary, secondary, tertiary }
          this.palette.colors = Object.entries<[number, number, number]>(finalColors).map(([name, hsl]) => {
            return {
              name: name as ColorsType,
              hex: PaletteModule.hslToHex(hsl)
            }
          })
        }
      })
    }

    if (file.type === 'image') {
      return fileOptions.concat([
        {
          title: 'Set as background',
          icon: 'mdi-share',
          callback: () => {
            ipcRenderer.send('sendCommand', { command: 'nitrogen', attrs: ['--set-auto', file.path]})
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