<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    app
    width="260"
    :dark="true"
    mobile-breakpoint="960"
    mini-variant-width="80"
    :mini-variant="miniVariant"
  >
    <v-list
      expand
      nav
    >
      <router-link
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        class="menu-link"
      >
        <v-icon
          class="memu-link-icon mr-2"
          v-text="item.icon"
        />
        {{ item.title }}
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class AppDrawer extends Vue {
  @Prop({ default: false }) readonly expandOnHover!: boolean

  miniVariant = false

  get menuItems() {
    return [
      {
        id: 'Boxes',
        name: 'Box',
        title: 'Boxes',
        badge: 0,
        isAvailable: true,
        to: {
          name: 'Box'
        },
        icon: 'mdi-widgets'
      },
      {
        id: 'Commands',
        name: 'Commands',
        title: 'Commands',
        badge: 0,
        isAvailable: true,
        to: {
          name: 'Command'
        },
        icon: 'mdi-bash'
      },
      {
        id: 'Palette',
        name: 'Palette',
        title: 'Palette',
        badge: 0,
        isAvailable: true,
        to: {
          name: 'Palette'
        },
        icon: 'mdi-creation'
      },
      {
        id: 'Settings',
        name: 'Settings',
        title: 'Settings',
        badge: 0,
        isAvailable: true,
        to: {
          name: 'Settings'
        },
        icon: 'mdi-cog'
      }
    ]
  }

  @Watch('$vuetify.breakpoint.smAndDown')
  onBreakPointChange(val: boolean) {
    this.$emit('update:expandOnHover', !val)
  }
}
</script>

<style lang="stylus">
.v-application a.menu-link
  display flex
  align-items center
  padding 8px 0
  text-decoration none
  color white
  font-weight 400
  transition .3s
  &.router-link-active
    .v-icon
      color: var(--v-primary-base)

#core-navigation-drawer
  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important

    .v-list-group--sub-group
      display: block !important

  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px
    .v-list-item__title,
    .v-list-item-badge
      display: inline
      flex: none

    .v-list-item-badge
      display: flex
      align-items: center
      justify-content: center
      color: white
      position: relative
      margin-left: 10px
      min-width: 20px
      height: 20px
      background: var(--color-active)
      border-radius: 50%
      font-size: 0.675rem
      text-align: center
      transition: all .2s ease-in-out

  .v-list-item--active .v-list-item-badge
    color: var(--color-active)
    background: white

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-group__header
      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2
  .company-site
    text-decoration: none
</style>
