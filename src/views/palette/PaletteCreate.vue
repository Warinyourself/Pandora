<template>
  <LayoutModifyPalette/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LayoutModifyPalette from '@/components/page/palette/LayoutModifyPalette.vue';

@Component({
  components: {
    LayoutModifyPalette,
  },
})
export default class PaletteCreatePage extends Vue {}
</script>
