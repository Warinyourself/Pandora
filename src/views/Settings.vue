<template>
  <AppContent>
    <v-btn color="bg">
      Seetings Here
    </v-btn>
    <AppBlock>
      <v-row>
        <v-col cols="auto">
          <v-btn
            fab
            dark
            small
            color="error"
            class="mt-2"
            @click="sendErrorNotify"
          >
            <v-icon
              dark
              color="white"
              v-text="'mdi-bell'"
            />
          </v-btn>
        </v-col>
      </v-row>
    </AppBlock>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class IndexPage extends Vue {
  sendErrorNotify() {
    this.$alert({
      type: 'error',
      title: 'Text notification',
      text: 'Error notification defult text'
    })
  }
}
</script>
