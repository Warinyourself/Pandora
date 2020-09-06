<template>
  <LayoutModifyBox />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LayoutModifyBox from '@/components/page/box/LayoutModifyBox.vue'

@Component({
  components: {
    LayoutModifyBox
  }
})
export default class CreateBoxPage extends Vue {}
</script>

<style lang="stylus"></style>
