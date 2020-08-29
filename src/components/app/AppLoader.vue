<template>
  <transition-group
    tag="div"
    :name="name"
  >
    <v-container
      v-if="isLoading"
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
    <div
      v-else
      key="block-content"
      class="block-content"
    >
      <slot
        v-bind="$attrs"
      />
    </div>
  </transition-group>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AppLoader extends Vue {
  @Prop({ required: true, type: Boolean }) isLoading!: boolean
  @Prop({ default: 'content-animation', type: String }) name!: String
}
</script>
