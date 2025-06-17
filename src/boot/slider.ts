import { defineBoot } from '#q-app/wrappers';
import VueSlider from 'vue-3-slider-component';

export default defineBoot(({ app }) => {
  app.component('VueSlider', VueSlider);
});
