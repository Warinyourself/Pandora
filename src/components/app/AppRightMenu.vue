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
            <p class="flex-1 mb-0">
              {{ item.title }}
            </p>
            <AppIcon class="right-menu-item-arrow" v-if="item.items && item.items.length" name="arrow"/>
            <ul
              class="right-menu-items"
              v-if="item.items && item.items.length"
            >
              <li
                class="right-menu-item"
                @click.stop.prevent="item.callback"
                v-for="item in item.items"
                :key="item.title"
              >
                <div class="right-menu-item-content">
                  <p class="flex-1 mb-0">
                    {{ item.title }}
                  </p>
                  <AppIcon class="right-menu-item-arrow" v-if="item.items && item.items.length" name="arrow"/>
                </div>
              </li>
            </ul>
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
  z-index 5
  & > .right-menu-item:hover
    .right-menu-items
      opacity 1
      display block

.right-menu-item-content
  padding 5px 10px
  position relative
  display flex
  align-items center
  z-index 2

.right-menu-item
  list-style none
  font-size .9rem
  cursor pointer
  position relative
  white-space nowrap
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

.right-menu-items
  top 0
  right 0
  opacity 1
  display none
  transition: .15s
  position absolute
  list-style none
  transform translateX(100%)

.right-menu-item-arrow
  height 100%
  transform rotate(180deg)
  opacity 0.8
  width 5px
  stroke white
</style>
