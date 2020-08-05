<template>
  <AppContent>
    Here you may create a command (later)
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ThemeModule } from '@/store/theme'

@Component
export default class CommandsPage extends Vue {
  get isDark() { return ThemeModule.isDark }

  get theme() { return ThemeModule.theme }
}
</script>
