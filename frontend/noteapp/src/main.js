import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.css";
import router from "./router";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import store from './store'
library.add(fas)

const app = createApp(App);
app.component('QuillEditor', QuillEditor)
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount("#app");
app.use(store)
