<template>
  <router-link
    :to="{name: 'BoxEdit', params: {id: box.name}}"
    class="block box-block"
    :style="`background-image: url(${image.src})`"
  >
    <h2 class="title">
      {{ box.name }}
    </h2>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

// eslint-disable-next-line no-unused-vars
import { Box } from '@/models/box'

@Component
export default class BoxBlock extends Vue {
  @Prop({ type: Object, required: true }) box!: Box

  get image() {
    return this.box.files.find(({ type }) => type === 'image')
  }
}
</script>

<style lang="stylus">
.box-block
  min-height 150px
  cursor pointer
  color white
  background-color rgba(0, 0, 0, .1)
  background-blend-mode darken
  background-size cover
  background-repeat no-repeat
  background-position center
</style>
