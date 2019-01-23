import 'muse-ui/lib/styles/base.less'
import {
  Carousel,
  Slider,
  Grid
}from 'muse-ui'

const components = [Carousel,Slider,Grid]

export default {
  install(Vue){
    components.forEach(c => Vue.use(c))
  }
}
