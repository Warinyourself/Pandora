<template>
  <div
    ref="drag"
    class="draggable"
    draggable="true"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PageModule } from '@/store/page'

@Component
export default class AppDrag extends Vue {
  @Prop() info!: unknown
  @Prop({ required: true, type: String }) type!: string

  get dragable() {
    return PageModule.dragable
  }

  get isActive() {
    return this.dragable.find(({ type }) => type === this.type)
  }

  mounted() {
    const drag = this.$refs.drag as HTMLElement

    if (!drag) {
      return
    }

    drag.addEventListener('dragstart', this.dragstart)
    drag.addEventListener('dragend', this.dragend)
  }

  dragend() {
    PageModule.REMOVE_DRAG(this.type)
    console.log('DRAG END')
  }

  dragstart(event: DragEvent) {
    if (!this.isActive) {
      PageModule.ADD_DRAG({
        type: this.type,
        info: this.info
      })
    }

    event.dataTransfer?.setData('info', JSON.stringify(this.info))
  }
}
</script>

<style lang="stylus"></style>
