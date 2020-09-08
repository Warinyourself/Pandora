<template>
  <div
    class="app-notification"
    @click="close"
    @mouseenter="hoverPause"
    @mouseleave="hoverPlay"
  >
    <div
      ref="loader"
      :style="loaderStyle"
      class="app-notification__loader"
    />
    <div class="app-notification__icon">
      <div class="app-notification__icon-emoji">
        {{ currentImage }}
      </div>
    </div>
    <div class="app-notification__body">
      <h3 class="app-notification__title">
        {{ notification.title || '123' }}
      </h3>
      <p
        class="app-notification__text"
        v-html="notification.text"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PageModule } from '@/store/page'

// eslint-disable-next-line no-unused-vars
import { INotification } from '@/models/page'

let lifeInterval: any

@Component
export default class AppNotification extends Vue {
  @Prop({ type: Object, required: true }) notification!: INotification
  timeout = 5000
  isRunning = true
  pauseOnHover = true
  draggable = true

  get loaderStyle() {
    return {
      animationDuration: `${this.timeout}ms`,
      animationPlayState: this.isRunning ? 'running' : 'paused'
    }
  }

  hoverPause() {
    if (this.pauseOnHover) {
      this.isRunning = false
    }
  }

  hoverPlay() {
    if (this.pauseOnHover) {
      this.isRunning = true
    }
  }

  focusPause() {
    this.isRunning = false
  }

  focusPlay() {
    this.isRunning = true
  }

  focusSetup() {
    const element = this.$el as HTMLElement

    element.addEventListener('blur', this.focusPause)
    element.addEventListener('focus', this.focusPlay)
  }

  focusCleanup() {
    const element = this.$el as HTMLElement

    element.removeEventListener('blur', this.focusPause)
    element.removeEventListener('focus', this.focusPlay)
  }

  get currentImage() {
    switch (this.notification.type) {
      case 'error': {
        return '👺'
      }
      case 'success': {
        return '🌟'
      }
      case 'warning': {
        return '👾'
      }
      default: {
        return this.notification.emoji || '🔔'
      }
    }
  }

  mounted() {
    const loader = this.$refs.loader as HTMLElement

    loader?.addEventListener('animationend', this.close)

    // if (this.draggable) {
    //   this.draggableSetup()
    // }
    this.focusSetup()
  }

  beforeDestroy() {
    const loader = this.$refs.loader as HTMLElement

    loader.removeEventListener('animationend', this.close)

    // if (this.draggable) {
    //   this.draggableCleanup()
    // }
    this.focusCleanup()
  }

  close() {
    this.$nextTick(() => {
      clearTimeout(lifeInterval)
      PageModule.HIDE_NOTIFICATION(this.notification.id)
    })
  }
}
</script>
