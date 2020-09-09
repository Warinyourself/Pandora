<template>
  <div>
    <v-expand-transition>
      <v-container
        v-show="isLoading"
        key="block-loading"
        class="block-loading"
      >
        <div
          class="text-center py-7"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </div>
      </v-container>
    </v-expand-transition>
    <v-expand-transition>
      <div
        v-show="!isLoading"
        key="block-content"
        class="block-content"
      >
        <slot
          v-bind="$attrs"
        />
      </div>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AppLoader extends Vue {
  @Prop({ required: true, type: Boolean }) isLoading!: boolean

  @Prop({ default: 'content-animation', type: String }) name!: string
}
</script>
