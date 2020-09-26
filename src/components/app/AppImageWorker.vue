<template>
  <AppDrop
    type="image"
    class="mb-2 color-worker image-worker"
    :is-empty="!image"
    :callback="handleDrop"
  >
    <template v-slot="{isActive, isFocus, dropInfo}">
      <div
        v-if="isActive"
        class="color-worker-wrapper"
      >
        put image here
      </div>
      <canvas
        v-if="(dropInfo && isFocus) || image && image.src"
        ref="canvas"
        width="100%"
        height="200px"
        :generate="JSON.stringify(setUpCanvas(dropInfo))"
        class="worker-canvas image-editor"
      />
    </template>
  </AppDrop>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ILoaderFile } from '@/models/page'
import { coverImage } from '@/utils/helper'

@Component
export default class AppImageWorker extends Vue {
  image: null | ILoaderFile = null

  handleDrop(file: ILoaderFile) {
    this.image = file
  }

  setUpCanvas(file?: ILoaderFile) {
    console.log('setup')
    this.$nextTick(() => {
      if (file) {
        this.image = file
      }
      this.generateCanvas()
    })

    return Math.random()
  }

  async generateCanvas() {
    const canvas = this.$refs.canvas as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    if (!ctx) { return }

    const image = await this.setImage()

    const ctxWidth = ctx.canvas.width
    const ctxHeight = ctx.canvas.height

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    coverImage(ctx, image, 'cover', ctxWidth, ctxHeight)
  }

  async setImage() {
    return new Promise<HTMLImageElement>(async(resolve, reject) => {
      if (!this.image) {
        reject(new Error('Upload image'))
        return
      }
      const img = new Image()

      img.onload = () => {
        resolve(img)
      }

      const src = await this.readAsDataURL(this.image.file)

      img.src = src
    })
  }

  readAsDataURL(file: File) {
    const reader = new FileReader()

    return new Promise<string>((resolve) => {
      reader.onload = (event) => {
        resolve(event?.target?.result as string)
      }
      reader.readAsDataURL(file)
    })
  }
}
</script>
