<template>
  <div
    :class="`app-notification ${closeByClick ? 'app-notification--close' : ''}`"
    @click="close"
  >
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

  closeByClick = false

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
    console.log('AAA')
    lifeInterval = setTimeout(() => {
      PageModule.HIDE_NOTIFICATION(this.notification.id)
    }, this.timeout)
  }

  close() {
    this.closeByClick = true

    this.$nextTick(() => {
      clearTimeout(lifeInterval)
      PageModule.HIDE_NOTIFICATION(this.notification.id)
    })
  }
}
</script>
