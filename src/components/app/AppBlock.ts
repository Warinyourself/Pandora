import { CreateElement, VNode } from 'vue/types'

export default {
  name: 'AppBlock',

  functional: true,

  render(h: CreateElement, { data, listeners, children }: any): VNode {
    return h('div', {
      staticClass: (`block ${data.staticClass || ''}`).trim(),
      on: listeners
    }, children)
  }
}
