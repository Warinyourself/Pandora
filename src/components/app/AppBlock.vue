<template functional>
  <div class="block" v-bind="$attrs">
    <slot/>
  </div>
</template>

<script type="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppBlock extends Vue {}
</script>

<style lang="stylus">
.block
  display block
  margin-bottom 16px
  border-radius 10px
  overflow hidden
  background var(--bg)
  padding 12px
  filter drop-shadow(0 0 12px rgba(0, 0, 0, .3))
</style>
