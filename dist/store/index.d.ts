import { ActionTree, Module, MutationTree } from 'vuex';
export interface EvoState {
    userInfo: {
        [k: string]: string;
    };
}
export declare const state: EvoState;
export declare const mutations: MutationTree<EvoState>;
export declare const actions: ActionTree<EvoState, {}>;
export declare const evo: Module<EvoState, {}>;
