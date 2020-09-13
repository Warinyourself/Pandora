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
      this.generateBody(h)
    ])
  }

  generateBody(h: CreateElement) {
    const lines = this.file.text?.split('\n')

    return h('div', {
      class: 'text-editor-body'
    }, [
      lines?.map((text, index) => this.generateLine(h, { text, index }))
    ])
  }

  generateLine(h: CreateElement, { index, text }: {index: number; text: string}) {
    return h('div', {
      class: 'line'
    }, [
      h('div', {
        class: 'line-margin'
      }, index + ''),
      h('div', {
        class: 'line-body',
        domProps: {
          innerHTML: text
        }
      })
    ])
  }
}
