<template>
  <transition-group
    tag="div"
    class="notification-wrapper"
    name="notification"
  >
    <AppNotification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </transition-group>
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
