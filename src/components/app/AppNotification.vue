<template>
  <div
    v-click-outside="handleClickOutside"
    :class="classes"
    :style="draggableStyle"
    @click="handleClick"
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
        {{ notification.title }}
      </h3>
      <p
        class="app-notification__text"
        v-html="notification.text.replace(/\n/g, '<br/>')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PageModule } from '@/store/page'
import { INotification } from '@/models/page'

import {
  getX,
  getY,
  isDOMRect
} from '@/utils/helper'

@Component
export default class AppNotification extends Vue {
  @Prop({ type: Object, required: true }) notification!: INotification
  timeout = 5000
  isRunning = true
  pauseOnHover = true
  draggable = true
  draggablePercent = 0.5

  beingDragged = false
  dragStart = 0
  dragPos = { x: 0, y: 0 }
  disableTransitions = false
  dragRect: DOMRect | Record<string, unknown> = {}

  get classes() {
    const classes = [
      'app-notification',
      `app-notification--${this.notification.type}`
    ]

    if (this.disableTransitions) {
      classes.push('disable-transition')
    }

    return classes
  }

  get draggableStyle() {
    if (this.dragStart === this.dragPos.x) {
      return {}
    }
    if (this.beingDragged) {
      return {
        transform: `translateX(${this.dragDelta}px)`,
        opacity: 1 - Math.abs(this.dragDelta / this.removalDistance)
      }
    }
    return {
      transition: 'transform 0.2s, opacity 0.2s',
      transform: 'translateX(0)',
      opacity: 1
    }
  }

  get dragDelta() {
    return this.beingDragged ? this.dragPos.x - this.dragStart : 0
  }

  get removalDistance() {
    if (isDOMRect(this.dragRect)) {
      return (this.dragRect.right - this.dragRect.left) * this.draggablePercent
    }
    return 0
  }

  get loaderStyle() {
    return {
      animationDuration: `${this.timeout}ms`,
      animationPlayState: this.isRunning ? 'running' : 'paused'
    }
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
    if (this.draggable) {
      this.draggableSetup()
    }
    this.focusSetup()

    const loader = this.$refs.loader as HTMLElement

    loader.addEventListener('animationend', this.close)
  }

  beforeDestroy() {
    if (this.draggable) {
      this.draggableCleanup()
    }
    this.focusCleanup()

    const loader = this.$refs.loader as HTMLElement

    loader.removeEventListener('animationend', this.close)
  }

  handleClickOutside() {
    this.isRunning = true
  }

  handleClick() {
    if (!this.beingDragged || this.dragStart === this.dragPos.x) {
      this.close()
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

  draggableSetup() {
    const element = this.$el as HTMLElement
    element.addEventListener('touchstart', this.onDragStart)
    element.addEventListener('mousedown', this.onDragStart)
    addEventListener('touchmove', this.onDragMove, { passive: false })
    addEventListener('mousemove', this.onDragMove)
    addEventListener('touchend', this.onDragEnd)
    addEventListener('mouseup', this.onDragEnd)
  }

  draggableCleanup() {
    const element = this.$el as HTMLElement
    element.removeEventListener('touchstart', this.onDragStart)
    element.removeEventListener('mousedown', this.onDragStart)
    removeEventListener('touchmove', this.onDragMove)
    removeEventListener('mousemove', this.onDragMove)
    removeEventListener('touchend', this.onDragEnd)
    removeEventListener('mouseup', this.onDragEnd)
  }

  onDragStart(event: TouchEvent | MouseEvent) {
    this.beingDragged = true
    this.dragPos = { x: getX(event), y: getY(event) }
    this.dragStart = getX(event)
    this.dragRect = this.$el.getBoundingClientRect()
  }

  onDragMove(event: TouchEvent | MouseEvent) {
    if (this.beingDragged) {
      event.preventDefault()
      if (this.isRunning) {
        this.isRunning = false
      }
      this.dragPos = { x: getX(event), y: getY(event) }
    }
  }

  onDragEnd() {
    if (this.beingDragged) {
      if (Math.abs(this.dragDelta) >= this.removalDistance) {
        this.disableTransitions = true
        this.$nextTick(() => this.close())
      } else {
        setTimeout(() => {
          this.beingDragged = false
          if (
            isDOMRect(this.dragRect) &&
              this.pauseOnHover &&
              this.dragRect.bottom >= this.dragPos.y &&
              this.dragPos.y >= this.dragRect.top &&
              this.dragRect.left <= this.dragPos.x &&
              this.dragPos.x <= this.dragRect.right
          ) {
            this.isRunning = false
          } else {
            this.isRunning = true
          }
        })
      }
    }
  }

  close() {
    PageModule.HIDE_NOTIFICATION(this.notification.id)
  }
}
</script>
