import { Store } from 'vuex';
import VueRouter from 'vue-router';
import { EvoState } from '@/store';
export interface BootstrapOptions {
    clientBaseURL: string;
    wsBaseURL: string;
    loginHost: string;
    logoutURL?: string;
    userInfoURL?: string;
    userInfoPath?: string;
    store: Store<{
        evo: EvoState;
    }>;
    router: VueRouter;
    $message: any;
    $modal: any;
}
export default function bootstrap(options: BootstrapOptions): void;
