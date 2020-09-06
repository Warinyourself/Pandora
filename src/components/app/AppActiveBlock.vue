<template>
  <div
    ref="block"
    @click.right.prevent.stop="viewMenu"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script type="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PageModule } from '@/store/page'

@Component
export default class AppActiveBlock extends Vue {
  @Prop({ type: Array, default: () => ([]) }) menu

  viewMenu(event) {
    PageModule.ASSING_MENU({
      view: true,
      items: this.menu,
      style: {
        top: `${event.pageY}px`,
        left: `${event.pageX}px`
      }
    })
  }
}
</script>

<style lang="stylus"></style>
