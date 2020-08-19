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
      class="block block mt-2"
    >
      Palette
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
            @click="activateColor(color)"
            :key="color.hex"
            :style="`background-color: ${color.hex}`"
          />
          <v-expand-transition>
            <ModifyColor v-show="activeColor" v-model="activeColor"/>
          </v-expand-transition>
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
import { Component, Vue, Prop } from 'vue-property-decorator'

import ModifyColor from '@/components/page/palette/ModifyColor.vue'

import { BoxModule } from '@/store/box'
import { PaletteModule } from '@/store/palette'


let ipcRenderer: Electron.IpcRenderer

const userAgent = navigator.userAgent.toLowerCase();
const isElectron = userAgent.indexOf(' electron/') > -1

if (isElectron) {
  const obj = window.require('electron')

  ipcRenderer = obj.ipcRenderer
}

// @ts-ignore
import ColorThief from 'colorthief'
import { defaultColors, defaultColor } from '@/models/palette'

// eslint-disable-next-line no-unused-vars
import { Box } from '@/models/box'
// eslint-disable-next-line no-unused-vars
import { Palette, PaletteColor } from '@/models/palette'
// eslint-disable-next-line no-unused-vars
import { LoaderFile, RightMenuItem } from '@/models/page'
// eslint-disable-next-line no-unused-vars
import { Color } from 'vuetify/lib/util/colors'

@Component({
  components: {
    ModifyColor
  }
})
export default class LayoutModifyBox extends Vue {
  @Prop({ type: Object }) box!: Box

  bg = {} as LoaderFile
  editFile = {} as LoaderFile
  boxName = 'Box name'
  files = [] as Array<LoaderFile>
  activeColor = {}
  palette = defaultColors
  hex = defaultColor
  viewColorPicker = false

  get isEdit() {
    return this.box
  }

  get boxes() {
    return BoxModule.boxes
  }

  async mounted() {
    if (this.box) {
      this.boxName = this.box.name
      this.files = this.box.files
    }
  }

  activateColor(color: Color) {
    console.log({ color })
    this.activeColor = color
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
      name: 'undefined',
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
          const palette: Palette = {
            id: Math.random() + '',
            name: 'From Box',
            colors: this.palette
          }

          PaletteModule.activatePalette({ palette, self: this })
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

  generateRightMenuColor(color: PaletteColor) {
    return [
      {
        title: 'Set',
        items: [
          {
            title: 'Set primary',
            callback: () => {
              color.name = 'primary'
            }
          },
          {
            title: 'Set secondary',
            callback: () => {
              color.name = 'secondary'
            }
          },
          {
            title: 'Set tertiary',
            callback: () => {
              color.name = 'tertiary'
            }
          },
          {
            title: 'Set background',
            callback: () => {
              color.name = 'bg'
            }
          }
        ]
      },
      {
        title: 'Delete',
        icon: 'mdi-trash-can-outline',
        callback: () => {
          this.palette = this.palette.filter((innerColor) => JSON.stringify(color) !== JSON.stringify(innerColor) )
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