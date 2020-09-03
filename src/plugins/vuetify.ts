import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const theme = {
  primary: '#ffd700',
  secondary: '#ff1c76',
  accent: '#9C27b0',
  info: '#91e60a',
};

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      dark: theme,
      light: theme,
    },
  },
});
