import { NavigationGuard, Route } from 'vue-router';
import { BootstrapOptions } from './bootstrap';
export declare const before: (options: BootstrapOptions) => NavigationGuard;
declare type afterHook = (to: Route, from: Route) => any;
export declare const after: () => afterHook;
export {};
