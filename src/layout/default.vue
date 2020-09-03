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
    <AppRightMenu/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppDrawer from '@/components/general/AppDrawer.vue';

@Component({
  components: {
    AppDrawer,
  },
})
export default class LayoutDefault extends Vue {}
</script>

<style lang="stylus"></style>
