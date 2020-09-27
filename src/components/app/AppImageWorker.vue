<template>
  <AppDrop
    type="image"
    class="mb-2 color-worker image-worker"
    :is-empty="!image"
    :callback="handleDrop"
    :validator="validateImage"
  >
    <template v-slot="{isActive, isFocus, dropInfo}">
      <div
        v-if="isActive"
        class="color-worker-wrapper"
      >
        put image here
      </div>
      <div
        v-if="(dropInfo && isFocus) || image && image.src"
        width="100%"
        height="100%"
        :generate="JSON.stringify(setUpCanvas(dropInfo, isFocus))"
      >
        <canvas
          ref="canvas"
          class="worker-canvas image-editor"
        />
        <div
          class="image-worker-colors"
        >
          <fade-transition
            tag="div"
            class="d-flex color-worker-body"
            :group="true"
          >
            <AppActiveBlock
              v-for="color in colors"
              :key="JSON.stringify(color)"
            >
              <div
                class="color-block"
                :style="`background-color: ${color}`"
              />
            </AppActiveBlock>
          </fade-transition>
        </div>
      </div>
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

  get colors() {
    if (!this.image) return []

    return this.image.palette
  }

  handleDrop(file: ILoaderFile) {
    this.image = file
  }

  setUpCanvas(file?: ILoaderFile, isFocus?: boolean) {
    this.$nextTick(() => {
      if (file && isFocus) {
        this.image = file
      }
      this.generateCanvas()
    })

    return Math.random()
  }

  validateImage(file?: ILoaderFile) {
    return file && file.type === 'image' && file.name !== this.image?.name
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
    // eslint-disable-next-line no-async-promise-executor
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
