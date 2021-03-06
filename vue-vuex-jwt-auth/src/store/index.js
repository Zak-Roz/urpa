import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { work } from './work.module';
import { poa } from './poa.module';
import { user } from './user.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    work,
    poa,
    user
  }
});
