<template>
  <AppContent>
    <v-btn color="bg">
      Seetings Here
    </v-btn>
    <v-row>
      <v-col cols="auto">
        <AppBlock class="w-100 ma-0">
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
          <v-btn
            fab
            dark
            small
            color="error"
            class="mt-2 ml-2"
            @click="startReload"
          >
            <v-icon
              dark
              color="white"
              v-text="'mdi-reload'"
            />
          </v-btn>
        </AppBlock>
      </v-col>
      <v-col cols="4">
        <AppBlock class="w-100 ma-0">
          <AppLoader :is-loading="isLoading">
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
          </AppLoader>
        </AppBlock>
      </v-col>
    </v-row>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class IndexPage extends Vue {
  isLoading = true

  startReload() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1500)
  }

  sendErrorNotify() {
    this.$alert({
      type: 'error',
      title: 'Text notification',
      text: 'Error notification defult text'
    })
  }
}
</script>
