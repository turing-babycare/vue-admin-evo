import Vue from 'vue';
import AdminLayout from './components/layouts/admin-layout/AdminLayout.vue';
import BlankLayout from './components/layouts/BlankLayout.vue';
import Request from './utils/request';
import { BootstrapOptions } from './utils/bootstrap';
import client from './utils/client';
import 'nprogress/nprogress.css';
declare function install(_Vue: typeof Vue, opt: BootstrapOptions): void;
declare const _default: {
    install: typeof install;
};
export default _default;
export { AdminLayout, BlankLayout, Request, client };
