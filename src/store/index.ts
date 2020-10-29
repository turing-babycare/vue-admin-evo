// import Vue from 'vue';
// import Vuex from 'vuex';

import { ActionTree, Module, MutationTree } from 'vuex';

interface UserInfo {
  [k: string]: string;
}

interface EvoState {
  userinfo: { [k: string]: string };
}

export const state: EvoState = {
  userinfo: {}
};

export const mutations: MutationTree<EvoState> = {
  setUserInfo(state: EvoState, payload: UserInfo) {
    state.userinfo = payload;
  }
};

export const actions: ActionTree<EvoState, {}> = {};

export const evo: Module<EvoState, {}> = {
  namespaced: true,
  state,
  actions,
  mutations
};
