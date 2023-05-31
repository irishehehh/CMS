import { createPinia } from "pinia";
import { App } from "vue";
import useLoginStore from "./login";

const pinia  = createPinia()


function registerPinia (app:App<Element>) {

  app.use(pinia)

  const loginStore = useLoginStore()

loginStore.loadLocalDataAction()

}






export default registerPinia

