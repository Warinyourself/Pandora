import { Component, Vue, Prop } from 'vue-property-decorator'
import { ILoaderFile } from '@/models/page'
import { CreateElement, VNode } from 'vue'
import { VIcon } from 'vuetify/lib'

@Component
export default class AppTextReader extends Vue {
  @Prop({ type: Object, required: true }) file!: ILoaderFile

  oldText = this.file.text

  get lines() {
    return this.file.text?.split('\n')
  }

  get wordsOfline() {
    return (text: string) => {
      return text.split(' ').filter(Boolean)
    }
  }

  get isUpdated() {
    return this.file.text !== this.oldText
  }

  // mdi:content-save"

  render(h: CreateElement): VNode {
    return h('div', {
      class: 'block text-editor'
    }, [
      h('div', {
        class: `text-editor-header ${this.isUpdated ? 'text-editor-header--updated' : ''}`
      }, [
        this.file.name,
        (this.isUpdated || true) && h(VIcon, {
          class: 'ml-2',
          on: {
            click: this.saveFile
          }
        }, ['mdi-content-save'])
      ]),
      this.generateBody(h)
    ])
  }

  saveFile() {
    this.$platform.saveFile(this.file)
  }

  generateBody(h: CreateElement) {
    const lines = this.lines

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
      }, index + 1 + ''),
      this.generateBodyLine(h, text, index)
    ])
  }

  generateBodyLine(h: CreateElement, text: string, rowOrder: number) {
    const hexRegex = /#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b/

    const words = this.wordsOfline(text).map((word, wordOrder) => {
      const hexMatch = word.toLocaleLowerCase().match(hexRegex)

      if (hexMatch) {
        return h('AppDrop', {
          class: 'line-word-wrapper',
          props: {
            type: 'color',
            activeClass: 'line-word-color--active',
            callback: (color: string) => {
              this.updateWordText(color, rowOrder, wordOrder)
            }
          }
        }, [
          h('div', {
            class: 'line-word-color',
            style: `background-color: ${hexMatch[0]};`
          }, word + ' ')
        ])
      }
      return word + ' '
    })

    return h('div', {
      class: 'line-body'
    }, words)
  }

  updateWordText(text: string, rowOrder: number, wordOrder: number) {
    this.file.text = this.lines?.map((line, i) => {
      if (rowOrder === i) {
        return this.wordsOfline(line).map((word, j) => {
          console.log({ word, j })
          return wordOrder === j ? text : word
        }).join(' ')
      }
      return line + ''
    }).join('\n')
  }
}
