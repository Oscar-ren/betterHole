import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
import routes from './config/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  let title = '360好坑';
  to.matched.forEach((item) => {
    title = item.meta.title || title;
  });
  document.title = title;
  next();
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
