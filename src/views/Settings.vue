<template>
  <AppContent>
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
      <v-col cols="4">
        <AppTextEditor :file="textFile" />
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
  isLoading = false

  textFile = {
    id: 'c024ba2a-8657-4b3f-a453-f393dd1fb3e0',
    path: '/home/atlant/Documents/Pandora/colors',
    name: 'colors',
    size: 517,
    file: '[object File]',
    type: 'text',
    hash: 'd5b0c6631bc58b81c9682845c8d7d532',
    text: '#define FOREGROUND #42b0ff\n#define BACKGROUND #13111C\n\n\n#define ACTIVE  #42b0ff\n#define ACTIVES #128fe8\n#define BACKGROUNDS #171928\n\n#define COLOR0  #13111C\n#define COLOR8  #171424\n#define COLOR1  #F90959\n#define COLOR9  #FB2078\n#define COLOR2  #E11EE1\n#define COLOR10 #F03ECA\n#define COLOR3  #E82A2A\n#define COLOR11 #6B19F0\n#define COLOR4  #6B19F0\n#define COLOR12 #731DFF\n#define COLOR5  #8116AE\n#define COLOR13 #9921CC\n#define COLOR6  #9A0AA2\n#define COLOR14 #B91AC1\n#define COLOR7  #F291B2\n#define COLOR15 #FBAFC8\n'
  }

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
