<template>
  <LayoutModifyPalette v-if="this.palette" :palette="palette"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LayoutModifyPalette from '@/components/page/palette/LayoutModifyPalette.vue';

@Component({
  components: {
    LayoutModifyPalette,
  },
})
export default class PaletteEditPage extends Vue {
  palette: any = null

  async mounted() {
    const { id } = this.$route.params;

    this.palette = await this.$db.get('palette', id);
  }
}
</script>
