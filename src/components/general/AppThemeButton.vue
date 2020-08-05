<template>
  <v-btn
    fab
    dark
    small
    color="primary"
    class="mt-2"
    @click="changeTheme"
  >
    <v-icon
      dark
      color="white"
      v-text="isDark ? 'mdi-brightness-5' : 'mdi-brightness-3'"
    />
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { ThemeModule } from '@/store/theme'

@Component
export default class AppPersonalPage extends Vue {
  isLoading = false

  get isDark() { return ThemeModule.isDark }

  changeTheme() {
    ThemeModule.changeTheme({ theme: this.isDark ? 'light' : 'dark', self: this })
  }
}
</script>
