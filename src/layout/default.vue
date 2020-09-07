<template>
  <v-app>
    <AppDrawer v-if="$vuetify.breakpoint.mdAndUp" />

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
    <AppRightMenu />
    <AppSnackbar />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppDrawer from '@/components/general/AppDrawer.vue'
import AppSnackbar from '@/components/general/AppSnackbar.vue'

@Component({
  components: {
    AppDrawer,
    AppSnackbar
  }
})
export default class LayoutDefault extends Vue {}
</script>

<style lang="stylus"></style>
