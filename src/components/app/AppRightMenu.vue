<template>
  <div>
    <transition name="fade">
      <ul
        class="right-menu"
        v-if="menu.view"
        :style="menu.style"
      >
        <li
          class="right-menu-item"
          @click.stop.prevent="item.callback"
          v-for="item in menu.items"
          :key="item.title"
        >
          {{ item.title }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script type="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PageModule } from '@/store/page'

@Component
export default class AppBlock extends Vue {

  get menu() {
    return PageModule.rightMenu
  }
}
</script>

<style lang="stylus">
.right-menu
  position absolute
  border-radius 5px
  overflow hidden
  z-index 10
  .right-menu-item
    padding 5px 10px
    font-size .9rem
    background #0f091d
    cursor pointer
    transition .2s
    &:hover
      background #241939
</style>
