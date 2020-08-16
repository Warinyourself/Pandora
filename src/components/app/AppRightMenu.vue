<template>
  <div>
    <transition name="fade-menu">
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
          <div class="right-menu-item-content">
            {{ item.title }}
          </div>
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
  z-index 5

.right-menu-item-content
  position relative
  z-index 2

.right-menu-item
  padding 5px 10px
  font-size .9rem
  cursor pointer
  position relative
  &::before
    content ''
    display block
    z-index 1
    background var(--v-bg-darken2)
    width 100%
    height 100%
    top 0
    left 0
    position absolute
    opacity 0.8
    transition .2s
  &:hover::before
    opacity 0.9
</style>
