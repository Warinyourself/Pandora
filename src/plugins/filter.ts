import Vue from 'vue'
// @ts-ignore
import twemoji from 'twemoji'

Vue.filter('emojiParse', function(value: string) {
  return twemoji
    .parse(value, { folder: 'svg', ext: '.svg' })
    .replace(/\\n/g, '<br>')
})
