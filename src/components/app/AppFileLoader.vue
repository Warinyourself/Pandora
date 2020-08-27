<template>
  <div class="app-file-loader" ref="loader">
    <input type="file" multiple :id="id" class="hide-input" @change="handleFileUpload">

    <div class="app-file-loader-wrapper">
      <label
        :for="id"
        :class="`app-file-loader-preview ${isFocus || !files.length ? 'active' : ''} ${finallyUnfocus ? 'unfocus' : ''}`"
      >
        <slot v-if="$slots.uploadFile" name="uploadFile" v-bind="{ isFocus, files}"/>
        <div v-else class="flex-full"> 
          <div :class="`app-file-loader-document-animation ${isFocus ? 'active' : ''}`">
            <AppIcon class="app-file-loader-document" name="file-image"/> 
            <AppIcon class="app-file-loader-document" name="file-image"/> 
            <AppIcon class="app-file-loader-document" name="file-image"/> 
          </div>
          <h5 class="mt-2"> {{ isFocus ? 'Drop' : 'Upload'}} files here </h5>
        </div>
      </label>

      <v-row v-if="files.length">
        <v-col
          v-for="(file, i) in files"
          :key="file.name + i"
          cols="3"
          lg="2"
          class="pa-2"
          @click="focusFileHash = file.hash"
        >
          <slot v-bind="{ file, remove }" class="update-class"/>
        </v-col>
      </v-row>
      <div v-if="focusFile">
        <slot name="focusFile" v-bind="{ file: focusFile, remove }"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// eslint-disable-next-line no-unused-vars
import { LoaderFile, LoaderFileType } from '@/models/page'

import { getUUID } from '@/utils/helper'

// @ts-ignore
import SparkMD5 from 'spark-md5'

// Couter for inner child on drag events
let counter = 0
let timeoutToUnfocus: any = null

@Component({
  model: {
    prop: 'files',
    event: 'input'
  }
})
export default class AppFileLoader extends Vue {
  @Prop({ type: Array, default: () => [] }) files!: LoaderFile[]
  @Prop() fileModifier!: (file: LoaderFile) => Partial<LoaderFile>

  isFocus = false
  finallyUnfocus = !!this.files.length

  focusFileHash = ''
  result = []
  id = getUUID()

  @Watch('files')
  __filesChange(files: LoaderFile[]) {
    if (files && files[0]?.hash && !this.focusFileHash) {
      this.focusFileHash = files[0].hash
    }
  }

  get focusFile() {
    return this.files.find(({ hash }) => hash === this.focusFileHash)
  }

  async mounted() {
    let dropArea = this.$refs.loader as HTMLElement

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, this.preventDefaults, false)
    })

    dropArea.addEventListener('dragenter', this.handlerDragEnter, false)
    dropArea.addEventListener('dragleave', this.handlerDragLeave)
    dropArea.addEventListener('drop', this.handlerDrop, false)

    if (this.files[0]) {
      this.focusFileHash = this.files[0]?.hash || ''
    }
  }

  preventDefaults (event: any) {
    event.preventDefault()
    event.stopPropagation()
  }

  handlerDragEnter() {
    this.finallyUnfocus = false
    // To discard another finallyUnfocus variable changes
    clearTimeout(timeoutToUnfocus)

    this.$nextTick(() => {
      counter++

      this.isFocus = true
    })
  }

  handlerDragLeave() {
    counter--

    if (counter === 0) {
      this.isFocus = false
      timeoutToUnfocus = setTimeout(() => {
        this.finallyUnfocus = true
      }, 1000)
    }
  }

  handlerDrop(event: DragEvent) {
    this.isFocus = false
    counter = 0
    timeoutToUnfocus = setTimeout(() => {
      this.finallyUnfocus = true
    }, 1000)

    let { dataTransfer } = event
    let files = dataTransfer?.files  

    if (files) {
      Array.from(files).forEach((file: File) => {
        this.parseFile(file)
      });
    }
  }

  handleFileUpload(event: any) {
    Array.from(event.target.files as ArrayLike<File>).forEach((file: File) => {
      this.parseFile(file)
    });
  }

  remove(file: LoaderFile) {
    this.files = this.files.filter(({ name }) => name !== file.name)
  }

  parseFile(file: File) {
    const { name, type, size, path } = file
    const reader = new FileReader()
    const imageExtentions = ['image/jpeg', 'image/png']
    const id = getUUID()
    let fileObject = {
      id,
      path,
      name,
      size, 
      file
    } as LoaderFile
    
    if (imageExtentions.includes(type)) {
      reader.readAsDataURL(file)

      reader.onload = async () => {
        fileObject.type = 'image' as LoaderFileType
        fileObject.src = reader.result as string
        
        const hash = SparkMD5.hash(reader.result)
        fileObject.hash = hash

        if (this.files.find(file => file.hash === hash)) {
          alert('already loaded')
          return
        }

        if (this.fileModifier) {
          fileObject = Object.assign(fileObject, await this.fileModifier(fileObject))
        }

        this.files.push(fileObject)

        if (!this.focusFileHash && hash) {
          this.focusFileHash = hash
        }
      }
    } else {
      fileObject.type = 'text' as LoaderFileType,

      reader.readAsText(file)
      reader.onload = async () => {
        const hash = SparkMD5.hash(reader.result);

        fileObject.hash = hash
        fileObject.text = reader.result as string

        if (this.files.find(file => file.hash === hash)) {
          alert('already loaded')
          return
        }

        if (this.fileModifier) {
          fileObject = Object.assign(fileObject, await this.fileModifier(fileObject))
        }

        this.files.push(fileObject)

        if (!this.focusFileHash && hash) {
          this.focusFileHash = hash
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.app-file-loader
  width 100%
  display flex
  flex-direction column
  position relative
  padding: 10px
  min-height 200px
  border-radius 10px
  background var(--v-bg-darken1)

.app-file-loader-files
  display flex
  flex-wrap wrap

.app-file-loader-file
  width 100%
  height 12vmin
  min-height 90px
  max-height 250px
  border-radius 10px

.app-file-loader-file--text
  position relative
  background var(--v-bg-base)
  display grid
  place-items center
  &::before
    content 'text'
    position absolute
    font-weight 900
    font-size 3rem
    z-index 0
    opacity 0.2

.app-file-loader-file-name
  z-index 1

.pe-none
  pointer-events none

.app-file-loader-wrapper
  position relative
  width 100%
  flex 1 1 auto
  height 100%

.flex-full
  width 100%
  flex 1 1 auto
  display flex
  align-items center
  flex-direction column

.app-file-loader-preview
  position absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
  cursor pointer
  flex 1 1 auto
  display flex
  align-items center
  opacity 0
  transition opacity .3s
  &.active
    opacity 1
    z-index 3 
  &.unfocus
    z-index -1 

.app-file-loader-document-animation
  position relative
  .app-file-loader-document
    transition .3s
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    .icon-bg
      fill var(--v-bg-darken1)
  &.active
    .app-file-loader-document:first-child
      transform-origin 0 100%
      transform translate(-50%, -60%) rotate(-40deg) scale(0.8)
    .app-file-loader-document:nth-child(2)
      transform-origin 100% 100%
      transform translate(-50%, -60%) rotate(40deg) scale(0.8)
    .app-file-loader-document:last-child
      transform translate(-50%, -50%) scale(0.95)

.app-file-loader-document, .app-file-loader-document-animation
  width 112px
  height 112px

.app-file-loader-file--image
  background-size cover
  background-position center

.color-block
  display flex
  align-items center
  justify-content center
  width 40px
  height 40px
  min-width 40px
  min-height 40px
  margin-right 5px
  border-radius 10px

.fw-wrap
  flex-wrap wrap

.c-pointer
  cursor pointer

.hide-input
  position absolute 
  top -9999px
  left -9999px
</style>
