import { Component, Vue, Prop } from 'vue-property-decorator'
import { ILoaderFile } from '@/models/page'
import { CreateElement, VNode } from 'vue'

@Component
export default class AppTextReader extends Vue {
  @Prop({ type: Object, required: true }) file!: ILoaderFile

  render(h: CreateElement): VNode {
    return h('div', {
      class: 'block text-editor'
    }, [
      h('div', {
        class: 'text-editor-header'
      }, [this.file.name]),
      h('div', {
        class: 'text-editor-body'
      }, [this.file.text])
    ])
  }
}
