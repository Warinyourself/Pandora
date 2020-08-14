<template>
  <AppContent>
    <v-text-field v-model="boxName"></v-text-field>

    <AppFileLoader v-model="files" :file-modifier="fileModifier">
      <template #emptyFileList>
        <div class="file-upload-body">
          <div>
            <AppIcon name="file-image"/> 
            <h5> Upload files here </h5>
          </div>
        </div>
      </template>
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
            <template v-slot:activator="{attrs, on}">
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
  
    <AppActiveBlock
      :menu="generatePaletteMenu()"
      class="block mt-2"
    >
      Palette:
      <AppDrop
        type="color"
        :callback="handleDropColor"
        v-if="palette.length"
      >
        <div class="d-flex fw-wrap mt-1">
          <AppActiveBlock
            :menu="generateRightMenuColor(color)"
            class="color-block" 
            v-for="color in palette"
            :key="color.hex"
            :style="`background-color: ${color.hex}`"
          />
        </div>
      </AppDrop>
    </AppActiveBlock>

    <v-dialog
      v-model="viewColorPicker"
      max-width="440px"
    >
      <div class="block ma-0">
        <v-color-picker
          class="ma-2"
          v-model="hex"
          dot-size="10"
          width="400px"
        ></v-color-picker>
        <v-btn
          @click="addColorToPalette"
          class="mt-2"
        > Accept </v-btn>
      </div>
    </v-dialog>

    <div
      v-if="bg.hash"
      class="block bg-image mt-2"
       :style="`background-image: url(${bg.src})`"
    />
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
import { Component, Vue } from 'vue-property-decorator'

let ipcRenderer: Electron.IpcRenderer

const userAgent = navigator.userAgent.toLowerCase();
const isElectron = userAgent.indexOf(' electron/') > -1

if (isElectron) {
  const obj = window.require('electron')

  ipcRenderer = obj.ipcRenderer
}

// @ts-ignore
import ColorThief from 'colorthief'

// eslint-disable-next-line no-unused-vars
import { Box } from '@/models/box'

// eslint-disable-next-line no-unused-vars
import { LoaderFile, RightMenuItem } from '@/models/page'

import { defaultColors } from '@/models/palette'

import { BoxModule } from '@/store/box'
import { ColorModule } from '@/store/color'

const defaultColor = '#FF00FF'

@Component
export default class EditBoxPage extends Vue {
  bg = {} as LoaderFile
  editFile = {} as LoaderFile
  boxName = 'Box name'
  files = [] as Array<LoaderFile>
  palette = defaultColors
  hex = defaultColor
  viewColorPicker = false

  get boxes() {
    return BoxModule.boxes
  }

  async mounted() {
    const id = this.$route.params.id
    const box = await this.$db.get('box', id) as Box

    if (box) {
      this.boxName = box.name
      this.files = box.files
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
    });
  }

  handleDropColor(color: string) {
    this.palette.push(
      {
        name: 'undefined',
        hex: color
      }
    )
  }

  async saveBox() {
    await this.$db.put('box', {
      name: this.boxName,
      files: []
    })
  }

  openViewColor() {
    this.viewColorPicker = true
  }

  addColorToPalette() {
    this.palette.push({
      name: Math.random() + '',
      hex: this.hex
    })

    this.viewColorPicker = false
    this.hex = defaultColor
  }

  generatePaletteMenu() {
    return [
      {
        title: 'Add color',
        callback: () => {
          this.openViewColor()
        }
      },
      {
        title: 'Set up palette',
        callback: () => {
          const theme = this.palette.reduce((theme: any, { hex, name }) => {
            theme[name] = hex

            return theme
          }, {})
          ColorModule.setTheme({ theme, self: this })
        }
      },
      {
        title: 'Save palette',
        callback: () => {
          this.$db.put('palette', this.palette, 'palette amount-' + Math.random())
        }
      },
      {
        title: 'Set default palette',
        callback: () => {
          this.palette = defaultColors
        }
      },
    ]
  }

  generateRightMenuColor(color: any) {
    return [
      {
        title: 'Set primary',
        callback: () => {
          ColorModule.setColor({ name: 'primary', color: color.hex})

          this.$vuetify.theme.themes.dark.primary = color.hex
          this.$vuetify.theme.themes.light.primary = color.hex
        }
      },
      {
        title: 'Set secondary',
        callback: () => {
          ColorModule.setColor({ name: 'secondary', color: color.hex})

          this.$vuetify.theme.themes.dark.secondary = color.hex
          this.$vuetify.theme.themes.light.secondary = color.hex
        }
      },
      {
        title: 'Set tertiary',
        callback: () => {
          ColorModule.setColor({ name: 'tertiary', color: color.hex})

          this.$vuetify.theme.themes.dark.tertiary = color.hex
          this.$vuetify.theme.themes.light.tertiary = color.hex
        }
      },
      {
        title: 'Set background',
        callback: () => {
          ColorModule.setColor({ name: 'bg', color: color.hex})

          this.$vuetify.theme.themes.dark.bg = color.hex
          this.$vuetify.theme.themes.light.bg = color.hex
        }
      },
      {
        title: 'Delete',
        icon: 'mdi-trash-can-outline',
        callback: () => {
          this.palette = this.palette.filter((innerColor) => JSON.stringify(color) !== JSON.stringify(innerColor) )
        }
      },
      {
        title: 'Update',
        callback: () => {
          
        }
      },
    ]
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
    if (file.type === 'image') {
      return [
        {
          title: 'Delete',
          icon: 'mdi-trash-can-outline',
          callback: () => remove(file)
        },
        {
          title: 'Save file',
          icon: 'mdi-content-save',
          callback: this.generateUpdateFileFunction(file)
        },
        {
          title: 'Set as image',
          icon: 'mdi-image-area',
          callback: () => {
            this.bg = file
          }
        },
        {
          title: 'Set as background',
          icon: 'mdi-share',
          callback: () => {
            ipcRenderer.send('sendCommand', { command: 'nitrogen', attrs: ['--set-auto', file.path]})
          }
        }
      ]
    }

    return [
      {
        title: 'Delete',
        icon: 'mdi-trash-can-outline',
        callback: () => remove(file)
      },
      {
        title: 'Save file',
        icon: 'mdi-content-save',
        callback: this.generateUpdateFileFunction(file)
      },
      {
        title: 'Set to edit',
        icon: 'mdi-pencil',
        callback: () => {
          this.editFile = file
        }
      },
    ]
  }
}
</script>

<style lang="stylus">
.bg-image
  background-size cover
  background-position center
  width 40vmin
  height 40vmin
  min-width 250px
  min-height 250px

.edit-file
  width 55vmin
  height 100%

.file-upload-body
  width 100%
  height 100%
  display grid
  place-items center
</style>