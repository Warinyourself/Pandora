<template>
  <div
    class="block command-block"
  >
    <h2 class="title"> {{ command.name }} </h2>
    <div v-if="command.list.default.examples">
      <div
        class="command-block-example"
        v-for="example in command.list.default.examples"
        :key="example.command"
      >
        {{ example.command }}
        <v-btn
          fab
          x-small
          color="primary"
          @click="initCommand(example.command)"
        >
          <v-icon>
            mdi-play
          </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

// eslint-disable-next-line no-unused-vars
import { Command } from '@/models/command';

@Component
export default class CommandBlock extends Vue {
  @Prop({ type: Object, required: true }) command!: Command

  initCommand(command: string) {
    this.$electron.ipcRenderer.send('sendCommand', { command });
  }
}
</script>

<style lang="stylus">
.command-block
  cursor pointer
  color white
  background-color rgba(0, 0, 0, .1)
  background-blend-mode darken
  background-size cover
  background-repeat no-repeat
  background-position center

.command-block-example
  display flex
  justify-content space-between
</style>
