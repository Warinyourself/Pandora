<template>
  <v-row>
    <v-col>
      <v-color-picker
        v-model="value.hex"
        class="ma-2"
        dot-size="10"
        width="400px"
      />
    </v-col>
    <v-col>
      <v-select
        v-model="value.name"
        :items="['primary', 'secondary', 'tertiary', 'fg', 'bg']"
        label="Set color type"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Palette, PaletteColor } from '@/models/palette'

@Component
export default class LayoutModifyPalette extends Vue {
  @Prop({ type: Object, default: () => ({}) }) value!: PaletteColor
}
</script>
