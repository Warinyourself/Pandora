<template>
  <div
    ref="drop"
    :class="classes"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot
      v-bind="{isActive, isFocus, dropInfo}"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PageModule } from '@/store/page'

let counter = 0

@Component
export default class AppDrop extends Vue {
  @Prop() callback!: Function
  @Prop({ required: true, type: String }) type!: string
  @Prop({ default: false, type: Boolean }) isEmpty!: boolean
  @Prop({ type: String, default: 'drop--active' }) activeClass!: string

  isFocus = false

  get classes() {
    return {
      drop: true,
      [this.activeClass]: this.currentItem,
      'drop--focus': this.isFocus,
      'drop--empty': this.isEmpty
    }
  }

  get dragable() {
    return PageModule.dragable
  }

  get isActive() {
    return !!this.currentItem
  }

  get dropInfo() {
    return this.currentItem?.info
  }

  get currentItem() {
    return this.dragable.find(({ type }) => type === this.type)
  }

  mounted() {
    const drop = this.$refs.drop as HTMLElement

    if (!drop) {
      return
    }

    ['drop', 'dragenter', 'dragover', 'dragleave'].forEach((eventName) => {
      drop.addEventListener(eventName, this.preventDefaults, false)
    })

    drop.addEventListener('drop', this.drop)
    drop.addEventListener('dragenter', this.dragenter)
    drop.addEventListener('dragleave', this.dragleave)
  }

  preventDefaults(event: Event) {
    event.preventDefault()
    event.stopPropagation()
  }

  dragenter() {
    counter++
    console.log('dragenter')

    this.isFocus = true
  }

  dragleave() {
    counter--
    console.log('dragleave')

    if (counter === 0) {
      this.isFocus = false
    }
  }

  drop(event: DragEvent) {
    if (this.currentItem) {
      const info = this.currentItem.info

      event.dataTransfer?.clearData()

      if (this.callback) {
        this.callback(info)
      }

      this.isFocus = false
      counter = 0

      PageModule.REMOVE_DRAG(this.type)
    }
  }
}
</script>

<style lang="stylus"></style>
