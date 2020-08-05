<template>
  <v-app
    :dark="isDark"
    :light="!isDark"
  >
    <!-- <AppBar /> -->
    <AppDrawer v-if="$vuetify.breakpoint.mdAndUp" />
    <!-- <AppPhoneDrawer v-else /> -->

    <v-main
      class="app-content"
    >
      <div
        ref="body"
        class="flex-grow-1"
      >
        <slot />
      </div>
    </v-main>
    <AppRightMenu/>
    <!-- <AppSnackbar /> -->
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { ThemeModule } from '@/store/theme'

// import AppBar from '@/components/general/AppBar.vue'
// import AppReload from '@/components/general/AppReload.vue'
import AppDrawer from '@/components/general/AppDrawer.vue'
// import AppFooter from '@/components/general/AppFooter.vue'
// import AppSnackbar from '@/components/general/AppSnackbar.vue'
// import AppPhoneDrawer from '@/components/general/AppPhoneDrawer.vue'
// import AppPlaceLayout from '@/components/general/AppPlaceLayout.vue'

@Component({
  components: {
  //   AppBar,
    AppDrawer,
  //   AppFooter,
  //   AppReload,
  //   AppSnackbar,
  //   AppPlaceLayout,
  //   AppPhoneDrawer
  },
})
export default class LayoutDefault extends Vue {
  expandOnHover = false
  clickInfo: number[] = []
  maxOffset = 250
  progress = 0

  get isDark() { return ThemeModule.isDark }

  // mounted() {
  //   const body = this.$refs.body as HTMLElement

  //   if (body) {
  //     body.addEventListener('mousedown', this.mouseStart)
  //     body.addEventListener('mousemove', this.mouseMove)
  //     body.addEventListener('mouseup', this.mouseEnd)

  //     body.addEventListener('touchstart', this.touchStart)
  //     body.addEventListener('touchmove', this.touchMove)
  //     body.addEventListener('touchend', this.touchEnd)
  //   }
  // }

  touchStart(event: TouchEvent) {
    event.stopPropagation()
    event.preventDefault()

    if (this.progress !== 100) {
      this.progress = 0
    }

    this.clickInfo = [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
  }

  touchMove(event: TouchEvent) {
    if (!this.clickInfo.length) return

    event.stopPropagation()
    event.preventDefault()

    let percent = 0

    const shiftY = this.clickInfo[1] - event.changedTouches[0].clientY

    if (shiftY < 0) {
      percent = Math.abs(shiftY) / this.maxOffset
      percent = percent > 1 ? 100 : percent * 100
      this.progress = percent
    }
  }

  touchEnd(event: TouchEvent) {
    event.stopPropagation()
    event.preventDefault()

    if (this.progress !== 100) {
      this.progress = 0
    }

    this.clickInfo = []
  }

  mouseStart(event: MouseEvent) {
    event.stopPropagation()
    if (this.progress !== 100) {
      this.progress = 0
    }

    this.clickInfo = [event.clientX, event.clientY]
  }

  mouseMove(event: MouseEvent) {
    if (!this.clickInfo.length) return

    event.stopPropagation()
    let percent = 0

    const shiftY = this.clickInfo[1] - event.clientY

    if (shiftY < 0) {
      percent = Math.abs(shiftY) / this.maxOffset
      percent = percent > 1 ? 100 : percent * 100
      this.progress = percent
    }
  }

  mouseEnd(event: MouseEvent) {
    event.stopPropagation()

    if (this.progress !== 100) {
      this.progress = 0
    }

    this.clickInfo = []
  }
}
</script>

<style lang="sass"></style>
