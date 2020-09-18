<template>
  <LayoutModifyBox
    v-if="box"
    :box="box"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LayoutModifyBox from '@/components/page/box/LayoutModifyBox.vue'
import { IBox } from '@/models/box'

@Component({
  components: {
    LayoutModifyBox
  }
})
export default class EditBoxPage extends Vue {
  box: IBox | undefined | null = null

  async mounted() {
    const { id } = this.$route.params

    const box = await this.$db.get<IBox>('box', id)

    if (box) {
      box.files = box.files.map((fileObject) => {
        if (['image', 'video'].includes(fileObject.type)) {
          fileObject.src = URL.createObjectURL(fileObject.file)
          return fileObject
        }
        return fileObject
      })

      this.box = box
    }
  }
}
</script>

<style lang="stylus"></style>
