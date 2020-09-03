import {
  Module, VuexModule, getModule, Mutation, Action,
} from 'vuex-module-decorators';
import store from '@/store';
import db from '@/controller/db';

import { Command } from '@/models/command';

export interface CommandState {
  commands: Command[];
}

@Module({ dynamic: true, store, name: 'Command' })
class CommandClass extends VuexModule implements CommandState {
  commands: Command[] = []

  @Mutation
  SET<S extends this, K extends keyof this>({ key, value }: { key: K; value: S[K] }) {
    this[key] = value;
  }

  @Action
  async loadAll() {
    const commands = await db.getAll<Command>('command');

    if (commands) {
      this.SET({ key: 'commands', value: commands });
    }
  }
}

export const CommandModule = getModule(CommandClass);
