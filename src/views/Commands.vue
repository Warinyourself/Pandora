<template>
  <AppContent>
    Here you may create a command (later)
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PaletteModule } from '@/store/palette'

@Component
export default class CommandsPage extends Vue {
  get isDark() { return PaletteModule.isDark }
}
</script>
