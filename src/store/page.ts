import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import { Route } from 'vue-router'
import store from '@/store'

import { RightMenu, DragItem } from '@/models/page'

export interface PageState {
  routes: Route[]
  isInited: boolean
}

@Module({ dynamic: true, store, name: 'page' })
class Page extends VuexModule implements PageState {
  routes: Route[] = []
  isInited = false
  routeReturnFunciton: null | Function = null
  dragable = [] as DragItem[]
  rightMenu = {
    view: false,
    style: {
      left: null,
      top: null
    },
    items: [
      {
        title: 'Copy',
        callback: () => {
          console.log('CTART HERE')
        }
      }
    ]
  }

  @Mutation
  SET<S extends this, K extends keyof this>({ key, value }: { key: K, value: S[K] }) {
    this[key] = value
  }

  @Mutation
  ADD_DRAG(drag: DragItem) {
    this.dragable.push(drag)
  }

  @Mutation
  REMOVE_DRAG(type: string) {
    this.dragable = this.dragable.filter(drag => drag.type !== type)
  }

  @Mutation
  ASSING_MENU(menu: Partial<RightMenu>) {
    this.rightMenu = Object.assign(this.rightMenu, menu)
  }

  get route() {
    return this.routes[this.routes.length]
  }

  get layout() {
    return (this.route && this.route.meta.layout) || 'default'
  }

  @Action
  handleKeypress(event: KeyboardEvent) {
    const { key, keyCode, shiftKey } = event

    const isEscape = event.which === 27 || event.key === 'Escape'

    if (isEscape && this.rightMenu.view) {
      this.ASSING_MENU({
        view: false,
      })
    }
  }
}

export const PageModule = getModule(Page)
