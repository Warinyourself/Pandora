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

export const coverImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, type: 'cover' | 'contain', ctxWidth: number, ctxHeight: number) => {
  const imgRatio = img.height / img.width
  const winRatio = ctxHeight / ctxWidth
  if ((imgRatio < winRatio && type === 'contain') || (imgRatio > winRatio && type === 'cover')) {
    const h = ctxWidth * imgRatio
    ctx.drawImage(img, 0, (ctxHeight - h) / 2, ctxWidth, h)
  }
  if ((imgRatio > winRatio && type === 'contain') || (imgRatio < winRatio && type === 'cover')) {
    const w = ctxWidth * winRatio / imgRatio
    ctx.drawImage(img, (ctxWidth - w) / 2, 0, w, ctxHeight)
  }
}
