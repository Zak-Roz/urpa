import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/navigation/Home.vue';
import Help from './views/navigation/Help.vue';
import Profile from './views/navigation/Profile.vue';

import BoardUser from './views/navigation/BoardUser.vue';
import BoardModerator from './views/navigation/BoardModerator.vue';
import BoardAdmin from './views/navigation/BoardAdmin.vue';

import Register from './views/navigation/Register.vue';
import Login from './views/navigation/Login.vue';

import RedAdmin from './views/navigation/RegAdmin.vue';
import Modal from './views/modals/workplace.vue';

import Poa from './views/poas/Poa.vue';
import PoaNew from './views/poas/PoaNew.vue';
import PoaFind from './views/poas/PoaFind.vue';
import PoaEdit from './views/poas/PoaEdit.vue';

import User from './views/users/User.vue';
import UserFind from './views/users/UserFind.vue';
import UserEdit from './views/users/UserEdit.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reg-admin',
      name: 'RedAdmin',
      component: RedAdmin
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/find-user',
      name: 'UserFind',
      component: UserFind
    },
    {
      path: '/user/:id',
      component: User,
      props: true,
    },
    // TODO edit-user
    {
      path: '/edit-user/:id',
      component: UserEdit,
      props: true,
    },
    {
      path: '/add-poa',
      component: PoaNew
    },
    {
      path: '/find-poa',
      component: PoaFind
    },
    {
      path: '/poa/:id',
      component: Poa,
      props: true,
    },
    // TODO edit-poa
    {
      path: '/edit-poa/:id',
      component: PoaEdit,
      props: true,
    },
    {
      path: '/reg-work',
      component: Modal
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/admin',
      name: 'admin',
      component: BoardAdmin,
    },
    {
      path: '/mod',
      name: 'moderator',
      component: BoardModerator,
    },
    {
      path: '/user',
      name: 'user',
      component: BoardUser,
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
