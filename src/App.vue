<template>
  <component
    :is="layout + 'Layout'"
  >
    <router-view />
  </component>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { PageModule } from '@/store/page'
import { PaletteModule } from '@/store/palette'

import noneLayout from '@/layout/none.vue'
import defaultLayout from '@/layout/default.vue'

import { defaultPalette } from '@/models/palette'

@Component({
  components: {
    noneLayout,
    defaultLayout
  }
})
export default class App extends Vue {
  get layout() {
    return PageModule.layout
  }

  get isDark() {
    return PaletteModule.isDark
  }

  mounted() {
    document.documentElement.addEventListener('keydown', PageModule.handleKeypress)

    this.$platform.setEnv()

    this.initPalette()
  }

  initPalette() {
    const currentPalette = localStorage.getItem('currentPalette')
    const palette = currentPalette ? JSON.parse(currentPalette) : defaultPalette

    this.$vuetify.theme.dark = this.isDark

    PaletteModule.activatePalette({ palette, self: this })
  }
}
</script>

<style lang="scss"></style>
