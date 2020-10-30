// import Vue from 'vue';
// import Vuex from 'vuex';

import { ActionTree, Module, MutationTree } from 'vuex';

interface UserInfo {
  [k: string]: string;
}

interface EvoState {
  userInfo: { [k: string]: string };
}

export const state: EvoState = {
  userInfo: {}
};

export const mutations: MutationTree<EvoState> = {
  setUserInfo(state: EvoState, payload: UserInfo) {
    state.userInfo = payload;
  }
};

export const actions: ActionTree<EvoState, {}> = {};

export const evo: Module<EvoState, {}> = {
  namespaced: true,
  state,
  actions,
  mutations
};
