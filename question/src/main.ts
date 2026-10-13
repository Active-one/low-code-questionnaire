import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
// 引入样式
import './assets/styles/index.scss';
// 引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// element-plus中文化
import zhCn from 'element-plus/es/locale/lang/zh-cn';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// 创建app
const app = createApp(App);

library.add(fas, far, fab);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
// 挂载
app.mount('#app');
