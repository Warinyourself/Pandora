import {
  Module, VuexModule, getModule, Mutation, Action
} from 'vuex-module-decorators'
import { Route } from 'vue-router'
import store from '@/store'

import { getUUID } from '@/utils/helper'
import { IRightMenu, DragItem, INotification } from '@/models/page'

export interface PageState {
  routes: Route[];
  isInited: boolean;
  IRightMenu: IRightMenu;
}

@Module({ dynamic: true, store, name: 'page' })
class Page extends VuexModule implements PageState {
  routes: Route[] = []

  isInited = false

  routeReturnFunciton: null | Function = null

  dragable = [] as DragItem[]
  notifications: INotification[] = []

  IRightMenu = {
    view: false,
    style: {
      left: '0px',
      top: '0px'
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
  SET<S extends this, K extends keyof this>({ key, value }: { key: K; value: S[K] }) {
    this[key] = value
  }

  @Mutation
  ADD_DRAG(drag: DragItem) {
    this.dragable.push(drag)
  }

  @Mutation
  SHOW_NOTIFICATION(notification: Partial<INotification>) {
    if (!notification.id) {
      notification.id = getUUID()
    }

    if (!notification.show) {
      notification.show = true
    }

    this.notifications.push(notification as INotification)
  }

  @Mutation
  HIDE_NOTIFICATION(uuid: string) {
    this.notifications = this.notifications.filter(({ id }) => id !== uuid)
  }

  @Mutation
  REMOVE_DRAG(type: string) {
    this.dragable = this.dragable.filter((drag) => drag.type !== type)
  }

  @Mutation
  ASSING_MENU(menu: Partial<IRightMenu>) {
    this.IRightMenu = Object.assign(this.IRightMenu, menu)
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

    if (isEscape && this.IRightMenu.view) {
      this.ASSING_MENU({
        view: false
      })
    }
  }
}

export const PageModule = getModule(Page)
