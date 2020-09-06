<template>
  <AppContent>
    <AppBlock>
      <h2 class="title">
        Choise box
      </h2>
      <div v-if="boxes.length">
        <v-row>
          <v-col
            v-for="box in boxes"
            :key="box.id"
            cols="6"
            md="4"
            xl="2"
          >
            <BoxBlock :box="box" />
          </v-col>
        </v-row>
        <AppButton
          color="primary"
          :to="{name: 'BoxCreate'}"
        >
          Create a box
        </AppButton>
      </div>
      <div v-else>
        You don't have any box, so,
        <AppButton
          color="primary"
          :to="{name: 'BoxCreate'}"
        >
          create a box
        </AppButton>
      </div>
    </AppBlock>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BoxModule } from '@/store/box'

// eslint-disable-next-line no-unused-vars
import { Box } from '@/models/box'
import BoxBlock from '@/components/page/box/BoxBlock.vue'

@Component({
  components: {
    BoxBlock
  }
})
export default class IndexPage extends Vue {
  get boxes() {
    return BoxModule.boxes
  }

  async mounted() {
    await BoxModule.loadAll()
  }
}
</script>

<style lang="sass">
.box-block
  cursor: pointer
</style>
