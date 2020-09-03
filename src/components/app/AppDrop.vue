<template>
  <div
    :class="`drop ${isActive ? 'drop--active' : ''} ${isFocus ? 'drop--focus' : ''}`"
    ref="drop"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PageModule } from '@/store/page';

@Component
export default class AppDrop extends Vue {
  @Prop() callback!: Function

  @Prop({ required: true, type: String }) type!: string

  isFocus = false

  get dragable() {
    return PageModule.dragable;
  }

  get isActive() {
    return this.dragable.find(({ type }) => type === this.type);
  }

  mounted() {
    const drop = this.$refs.drop as HTMLElement;

    if (!drop) {
      return;
    }

    ['drop', 'dragenter', 'dragover', 'dragleave'].forEach((eventName) => {
      drop.addEventListener(eventName, this.preventDefaults, false);
    });

    drop.addEventListener('drop', this.drop);
    drop.addEventListener('dragenter', this.dragenter);
    drop.addEventListener('dragleave', this.dragleave);
  }

  preventDefaults(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  dragenter() {
    this.isFocus = true;
  }

  dragleave() {
    this.isFocus = false;
  }

  drop(event: DragEvent) {
    if (!this.isActive) {
      PageModule.REMOVE_DRAG(this.type);
    }

    const info = event.dataTransfer?.getData('info');
    event.dataTransfer?.clearData();

    if (this.callback) {
      this.callback(info);
    }

    this.isFocus = false;
  }
}
</script>

<style lang="stylus"></style>
