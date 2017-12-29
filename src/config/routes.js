import Home from '../view/routes/home/index.vue';
import Init from '../view/routes/init/index.vue';
import UserInfo from '../view/routes/userInfo/index.vue';

let routes = [
  {
    path: '/home',
    component: Home,
    meta: {
      title: '主页'
    }
  },
  {
    path: '/userInfo',
    component: UserInfo,
    meta: {
      title: '个人信息'
    }
  },
  {
    path: '/',
    component: Init
  }
];

export default routes;
