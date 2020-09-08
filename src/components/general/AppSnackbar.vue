<template>
  <div
    class="notification-wrapper"
  >
    <fade-transition :group="true">
      <AppNotification
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </fade-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PageModule } from '@/store/page'

@Component
export default class AppSnackbar extends Vue {
  get notifications() {
    return PageModule.notifications
  }
}
</script>
