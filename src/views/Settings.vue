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
    <AppFileLoader
      v-model="files"
    >
      <template v-slot="{file}">
        <AppActiveBlock>
          <div
            :class="`app-file-loader-file app-file-loader-file--${file.type} ${file.loading ? '' : 'app-file-loader-file--loading'}`"
            :style="`${file.type === 'image' ? 'background-image: url(' + file.src + ')': ''}`"
          >
            <div
              v-if="file.loading"
              class="position-center"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              />
            </div>
            <div
              v-if="file.type === 'text'"
              class="app-file-loader-file-name"
            >
              {{ file.name }}
            </div>
          </div>
        </AppActiveBlock>
      </template>
    </AppFileLoader>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getUUID } from '@/utils/helper'

@Component
export default class IndexPage extends Vue {
  isLoading = true

  files = [{
    name: 'sadf',
    id: getUUID(),
    size: 23124,
    type: 'image',
    loading: true
  }]

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
