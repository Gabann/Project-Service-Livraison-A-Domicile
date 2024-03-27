import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import vueRouter from './router/vueRouter.js';

//css used globally
import './assets/main.css';

//global bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

app.use(createPinia());
app.use(vueRouter);

app.mount('#app');
