<template>
  <AppContent>
    <AppBlock>
      <h2 class="title"> Commands </h2>
      <div v-if="!commands.length">
        Commands list is empty, you can 
        <v-btn
          color="primary"
          :to="{ name: 'CommandCreate' }"
        >
          create command
        </v-btn>
      </div>
    </AppBlock>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PaletteModule } from '@/store/palette'

@Component
export default class CommandPage extends Vue {
  get isDark() { return PaletteModule.isDark }

  get commands() {
    return []
  }
}
</script>
