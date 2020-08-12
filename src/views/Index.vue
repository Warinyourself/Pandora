<template>
  <AppContent>
    <AppBlock>
      <h2 class="title"> Choise box </h2>
      <div v-if="boxes.length">
        <v-row>
          <v-col v-for="box in boxes" :key="box.id">
            <router-link :to="`/${box.name}`" class="box-block"> 
              <h2 class="title"> Name: {{ box.name }}</h2>
              <p v-if="box.files"> Files: {{ box.files.length }} </p>
            </router-link>
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

// eslint-disable-next-line no-unused-vars
import { Box } from '@/models/box'

@Component
export default class IndexPage extends Vue {
  get boxes() {
    return BoxModule.boxes
  }

  async mounted() {
    const boxes = await this.$db.getAll('box') as Box[]

    BoxModule.SET({ key: 'boxes', value: boxes })
  }
}
</script>

<style lang="sass">
.box-block
  cursor: pointer
</style>