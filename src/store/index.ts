// import Vue from 'vue';
// import Vuex from 'vuex';

import { ActionTree, Module, MutationTree } from 'vuex';

export interface UserInfo {
  ws_token: { ns: string; token: string };
  avatar: string;
  id: number;
  navigation: {
    key: string;
    text: string;
    url: string;
  }[];
  token: string;
}

export interface EvoState {
  userInfo: UserInfo;
}

export const state: EvoState = {
  userInfo: {
    avatar: '',
    id: NaN,
    navigation: [
      {
        key: '',
        text: '',
        url: ''
      }
    ],
    token: '',
    // eslint-disable-next-line @typescript-eslint/camelcase
    ws_token: {
      ns: '',
      token: ''
    }
  }
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
