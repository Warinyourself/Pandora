export const getUUID = () => {
  let date = new Date().getTime()

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (c) => {
      const r = (date + Math.random() * 16) % 16 | 0
      date = Math.floor(date / 16)
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )

  return uuid
}

interface DictionaryLike {
  [index: string]: unknown;
}

export const isNumber = (value: unknown): value is number => typeof value === 'number'

export const isObject = (value: unknown): value is DictionaryLike =>
  typeof value === 'object' && value !== null

export const isTouchEvent = (event: Event): event is TouchEvent =>
  window.TouchEvent && event instanceof TouchEvent

export function getX(event: MouseEvent | TouchEvent) {
  return isTouchEvent(event) ? event.targetTouches[0].clientX : event.clientX
}

export function getY(event: MouseEvent | TouchEvent) {
  return isTouchEvent(event) ? event.targetTouches[0].clientY : event.clientY
}

export const isDOMRect = (obj: any): obj is DOMRect =>
  isObject(obj) &&
  isNumber(obj.height) &&
  isNumber(obj.width) &&
  isNumber(obj.right) &&
  isNumber(obj.left) &&
  isNumber(obj.top) &&
  isNumber(obj.bottom)
