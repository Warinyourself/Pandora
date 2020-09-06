<template>
  <v-app>
    <slot />
    <AppSnackbar />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NoneDefault extends Vue {}
</script>
