<template>
  <div class="app-file-loader" ref="loader">
    <div class="app-file-loader-header">
      {{ text }}
    </div>
    <input type="file" multiple :id="id" class="hide-input" @change="handleFileUpload">
    <label :for="id" v-if="!files.length" class="c-pointer">
      <slot name="emptyFileList"/>
    </label>
    <v-row v-else>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// eslint-disable-next-line no-unused-vars
import { LoaderFile, LoaderFileType } from '@/models/page'

import { getUUID } from '@/utils/helper'

// @ts-ignore
import SparkMD5 from 'spark-md5'  

@Component
export default class AppFileLoader extends Vue {
  @Prop({ type: String }) msg!: string;
  @Prop() fileModifier!: (file: LoaderFile) => Partial<LoaderFile>;

  text = 'put file here'
  focusFileHash = ''
  files: LoaderFile[] = []
  result = []
  id = getUUID()

  get focusFile() {
    return this.files.find(({ hash }) => hash === this.focusFileHash)
  }

  async mounted() {
    let dropArea = this.$refs.loader as HTMLElement

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, this.preventDefaults, false)
    })

    dropArea.addEventListener('dragenter', this.handlerDragEnter, false)
    dropArea.addEventListener('dragleave', this.handlerDragLeave, false)
    // dropArea.addEventListener('dragover', this.handlerDragOver, false)
    dropArea.addEventListener('drop', this.handlerDrop, false)
  }

  preventDefaults (event: any) {
    event.preventDefault()
    event.stopPropagation()
  }

  handlerDragEnter(event: DragEvent) {
    this.text = 'Hold up mouse'

    console.log("handlerDragEnter", event)
  }

  handlerDragLeave(event: DragEvent) {
    this.text = 'put file here'
   
   console.log("handlerDragLeave", event)
  }

  // handlerDragOver(event: DragEvent) {
  // console.log("handlerDragOver", event)
  // }
  
  handlerDrop(event: DragEvent) {
    this.text = 'put file here'

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
  padding: 10px
  min-height 235px
  border-radius: 10px
  background: var(--bg-dark)

.app-file-loader-files
  display flex
  flex-wrap: wrap

.app-file-loader-file
  width: 100%
  height: 12vmin
  min-height: 90px
  max-height: 250px
  border-radius: 10px

.app-file-loader-file--text
  position relative
  background var(--bg)
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

.app-file-loader-file--image
  background-size cover
  background-position center

.color-block
  width 40px
  height 40px
  margin-right 5px
  margin-bottom 5px
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
