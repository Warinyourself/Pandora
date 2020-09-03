<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot/>
  </v-btn>
</template>

<script type="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppButton extends Vue {}
</script>

<style lang="stylus"></style>
