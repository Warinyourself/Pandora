<template>
  <div
    ref="loader"
    class="app-file-loader"
  >
    <input
      :id="id"
      type="file"
      multiple
      class="hide-input"
      @change="handleFileUpload"
    >

    <div class="app-file-loader-wrapper">
      <label
        :for="!blockToUploadType ? id : ''"
        :class="`app-file-loader-preview ${files.length && isShowWrapper ? 'has-files' : ''} ${isShowWrapper ? 'active' : ''} ${isUnfocusWrapper ? 'unfocus' : ''} ${blockToUploadType ? 'block' : ''}`"
      >
        <slot
          v-if="$slots.wrapper"
          name="wrapper"
          v-bind="{isFocus, files}"
        />
        <div
          v-else
          class="flex-full"
        >
          <div :class="`app-file-loader-document-animation ${isFocus ? 'active' : ''}`">
            <AppIcon
              class="app-file-loader-document"
              name="file-image"
            />
            <AppIcon
              class="app-file-loader-document"
              name="file-image"
            />
            <AppIcon
              class="app-file-loader-document"
              name="file-image"
            />
            <AppIcon
              class="app-file-loader-document-block"
              name="file-cancel"
            />
          </div>
          <h5 class="mt-2"> {{ isFocus ? 'Drop' : 'Upload' }} files here </h5>
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
          <slot
            v-bind="{file, remove}"
            class="update-class"
          />
        </v-col>
      </v-row>
      <div v-if="focusFile">
        <slot
          name="focusFile"
          v-bind="{file: focusFile, remove}"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch
} from 'vue-property-decorator'

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

  hideWrapper = true

  blockToUploadType: 'fileType' | '' = ''

  get isShowWrapper() {
    return !this.files.length || this.isFocus
  }

  get isUnfocusWrapper() {
    return !this.isShowWrapper && this.hideWrapper
  }

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
    const dropArea = this.$refs.loader as HTMLElement;
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropArea.addEventListener(eventName, this.preventDefaults, false)
    })

    dropArea.addEventListener('dragenter', this.handlerDragEnter, false)
    dropArea.addEventListener('dragleave', this.handlerDragLeave)
    dropArea.addEventListener('drop', this.handlerDrop, false)

    if (this.files[0]) {
      this.focusFileHash = this.files[0]?.hash || ''
    }
  }

  preventDefaults(event: any) {
    event.preventDefault()
    event.stopPropagation()
  }

  handlerDragEnter(event: DragEvent) {
    const info = event.dataTransfer?.items

    if (info) {
      if (Array.from(info).some((item) => !['file'].includes(item.kind))) {
        this.isFocus = false
        this.blockToUploadType = 'fileType'
        return
      }
      this.isFocus = true
      this.blockToUploadType = ''
    }

    this.hideWrapper = false
    // To discard another hideWrapper variable changes
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
        this.hideWrapper = true
        this.blockToUploadType = ''
      }, 1000)
    }
  }

  handlerDrop(event: DragEvent) {
    this.isFocus = false
    counter = 0
    timeoutToUnfocus = setTimeout(() => {
      this.hideWrapper = true
    }, 1000)

    const { dataTransfer } = event
    const files = dataTransfer?.files

    if (files) {
      Array.from(files).forEach((file: File) => {
        this.parseFile(file)
      })
    }
  }

  handleFileUpload(event: any) {
    Array.from(event.target.files as ArrayLike<File>).forEach((file: File) => {
      this.parseFile(file)
    })
  }

  remove(file: LoaderFile) {
    this.$emit('input', this.files.filter(({ name }) => name !== file.name))
  }

  parseFile(file: File) {
    const {
      name, type, size, path
    } = file
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

      reader.onload = async() => {
        fileObject.type = 'image' as LoaderFileType
        fileObject.src = reader.result as string

        const hash = SparkMD5.hash(reader.result)
        fileObject.hash = hash

        if (this.files.find((file) => file.hash === hash)) {
          this.$alert({
            title: 'Already loaded',
            text: 'File already loaded'
          })
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
      fileObject.type = 'text' as LoaderFileType

      reader.readAsText(file)
      reader.onload = async() => {
        const hash = SparkMD5.hash(reader.result)

        fileObject.hash = hash
        fileObject.text = reader.result as string

        if (this.files.find((file) => file.hash === hash)) {
          this.$alert({
            title: 'Already loaded',
            text: 'File already loaded'
          })
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

<style lang="stylus"></style>
