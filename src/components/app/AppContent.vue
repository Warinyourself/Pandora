<template>
  <v-container class="pa-4">
    <slot></slot>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// import { PageModule } from '@/store/page'

@Component
export default class AppContent extends Vue {}
</script>
