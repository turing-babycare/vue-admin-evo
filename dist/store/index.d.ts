import { ActionTree, Module, MutationTree } from 'vuex';
export interface UserInfo {
    ws_token: {
        ns: string;
        token: string;
    };
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
export declare const state: EvoState;
export declare const mutations: MutationTree<EvoState>;
export declare const actions: ActionTree<EvoState, {}>;
export declare const evo: Module<EvoState, {}>;
