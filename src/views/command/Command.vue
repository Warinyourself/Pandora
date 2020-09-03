<template>
  <AppContent>
    <AppBlock>
      <h2 class="title"> Commands </h2>
      <div v-if="!commands.length">
        Commands list is empty, you can
      </div>
      <div v-else>
        <CommandBlock
          v-for="command in commands"
          :key="command.id"
          :command="command"
        />
      </div>
      <v-btn
        color="primary"
        :to="{ name: 'CommandCreate' }"
      >
        create command
      </v-btn>
    </AppBlock>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PaletteModule } from '@/store/palette';
import { CommandModule } from '@/store/command';

import CommandBlock from '@/components/page/command/CommandBlock.vue';

@Component({
  components: {
    CommandBlock,
  },
})
export default class CommandPage extends Vue {
  get isDark() { return PaletteModule.isDark; }

  get commands() {
    return CommandModule.commands;
  }

  mounted() {
    CommandModule.loadAll();
  }
}
</script>
