// import Vue from 'vue';
// import Vuex from 'vuex';

import { ActionTree, Module, MutationTree } from 'vuex';

export interface UserInfo {
  ws_token: { ns: string; token: string };
  avatar: string;
  id: number;
  name: string;
  user: {
    name: string;
    id: number;
    userid: string;
  };
  authInfo: AuthInfo[];
  token: string;
  order: string[];
}

export interface AuthInfo {
  name: string;
  path: string;
  id: string;
  url: string;
  children?: AuthInfo[];
}

export interface EvoState {
  userInfo: UserInfo;
}

export const state: EvoState = {
  userInfo: {
    avatar: '',
    id: NaN,
    name: '',
    authInfo: [
      {
        name: '',
        path: '',
        id: '',
        url: ''
      }
    ],
    user: { name: '', id: NaN, userid: '' },
    token: '',
    // eslint-disable-next-line @typescript-eslint/camelcase
    ws_token: {
      ns: '',
      token: ''
    },
    order: []
  }
};

export const mutations: MutationTree<EvoState> = {
  setUserInfo(state: EvoState, payload: UserInfo) {
    if (!payload.name) {
      payload.name = payload.user.name;
    }
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
