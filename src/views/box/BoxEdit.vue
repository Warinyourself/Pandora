<template>
  <LayoutModifyBox
    v-if="box"
    :box="box"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LayoutModifyBox from '@/components/page/box/LayoutModifyBox.vue'
// eslint-disable-next-line no-unused-vars
import { Box } from '@/models/box'

@Component({
  components: {
    LayoutModifyBox
  }
})
export default class EditBoxPage extends Vue {
  box: Box | null | undefined = null

  async mounted() {
    const { id } = this.$route.params

    this.box = await this.$db.get<Box>('box', id)
  }
}
</script>

<style lang="stylus"></style>
