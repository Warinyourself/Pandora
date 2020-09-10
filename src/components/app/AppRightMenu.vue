<template>
  <div>
    <transition name="fade-menu">
      <ul
        v-if="menu.view"
        v-click-outside="closeMenu"
        class="right-menu"
        :style="menu.style"
      >
        <li
          v-for="item in menu.items"
          :key="item.title"
          :class="`right-menu-item ${item.disabled ? 'right-menu-items--disabled' : ''}`"
          @click.stop.prevent="handleCallback(item)"
        >
          <div class="right-menu-item-content">
            <AppIcon
              v-if="item.icon"
              class="right-menu-item-icon"
              :name="item.icon"
            />
            <p class="flex-1 mb-0">
              {{ item.title }}
            </p>
            <AppIcon
              v-if="item.items && item.items.length"
              class="right-menu-item-arrow"
              name="arrow"
            />
            <ul
              v-if="item.items && item.items.length"
              class="right-menu-items"
            >
              <li
                v-for="subItem in item.items"
                :key="subItem.title"
                :class="`right-menu-item ${subItem.disabled ? 'right-menu-items--disabled' : ''}`"
                @click.stop.prevent="subItem.callback"
              >
                <div class="right-menu-item-content">
                  <p class="flex-1 mb-0">
                    {{ subItem.title }}
                  </p>
                  <AppIcon
                    v-if="subItem.items && subItem.items.length"
                    class="right-menu-item-arrow"
                    name="arrow"
                  />
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

  async handleCallback(item) {
    await item.callback()

    this.closeMenu()
  }

  closeMenu() {
    PageModule.ASSING_MENU({
      view: false
    })
  }
}
</script>

<style lang="stylus">
.right-menu
  position absolute
  border-radius 5px
  z-index 5
  .right-menu-item:first-child
    border-radius 6px 6px 0 0
    overflow hidden
  .right-menu-item:last-child
    border-radius 0 0 6px 6px
    overflow hidden
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

.right-menu-item-content .right-menu-item-icon
  font-size 1rem
  margin-right 8px

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

.right-menu-items--disabled
  cursor not-allowed
  pointer-events none
  .right-menu-item-content
    opacity 0.6
</style>
