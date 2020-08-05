<template>
  <AppContent>
      <v-btn color="bg">Seetings Here</v-btn>
      <p> Theme: {{ theme }} </p>
      <p> isDark: {{ isDark }} </p>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ThemeModule } from '@/store/theme'

@Component
export default class IndexPage extends Vue {
  get isDark() { return ThemeModule.isDark }

  get theme() { return ThemeModule.theme }
}
</script>
