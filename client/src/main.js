import Vue from 'vue';

import Router from 'vue-router';
import App from './App.vue';
// Pages
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MainPage from './pages/Main';

import store from './store';

Vue.config.productionTip = false

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/register',
      component: RegisterPage
    }
  ]
})



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
