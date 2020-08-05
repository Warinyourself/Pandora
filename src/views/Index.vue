<template>
  <AppContent>
    <AppBlock>
      <h2 class="title"> Choise box </h2>
      <div v-if="boxes.length">
        <v-row>
          <v-col v-for="box in boxes" :key="box.id">
            <div class="box-block"> 
              <h2> {{ box.name }}</h2>
              <p v-if="box.files"> Files: {{ box.files.length }} </p>
            </div>
          </v-col>
        </v-row>
        <AppButton
          color="primary"
          :to="{ name: 'BoxCreate' }"
        > Create a box </AppButton>
      </div>
      <div v-else>
        You don't have any box, so, 
        <AppButton
          color="primary"
          :to="{ name: 'BoxCreate' }"
        > create a box </AppButton>
      </div>
    </AppBlock>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { BoxModule } from '@/store/box'

@Component
export default class IndexPage extends Vue {
  get boxes() {
    return BoxModule.boxes
  }

  async mounted() {
    const boxes = await this.$db.getAll('box')

    BoxModule.SET({ key: 'boxes', value: boxes })
  }
}
</script>
