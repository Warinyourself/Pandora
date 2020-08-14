<template>
  <component
    :is="layout + 'Layout'"
  >
    <router-view/>
  </component>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { PageModule } from '@/store/page'
import { ThemeModule } from '@/store/theme'
import { ColorModule } from '@/store/color'

import noneLayout from '@/layout/none.vue'
import defaultLayout from '@/layout/default.vue'

import { defaultColors } from '@/models/palette'

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

  mounted() {
    document.documentElement.addEventListener('keydown', PageModule.handleKeypress)

    const themeMode = localStorage.getItem('theme') || 'light'

    ThemeModule.changeTheme({ theme: themeMode, self: this })

    const theme = defaultColors.reduce((theme: any, { hex, name }) => {
      theme[name] = hex

      return theme
    }, {})

    ColorModule.setTheme({ theme, self: this })
  }
}
</script>

<style lang="scss"></style>
