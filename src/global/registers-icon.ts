import type { App } from "vue";
import * as ELementPlusIconsVue from '@element-plus/icons-vue'
function registerIcons (app:App) {

  for (const [key,value] of Object.entries(ELementPlusIconsVue)) {
    app.component(key,value)
  }



  

}

export default registerIcons