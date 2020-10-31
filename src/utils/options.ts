let options = {};
import { BootstrapOptions } from './bootstrap';
export function getOptions() {
  return options;
}

export function setOptions(v: BootstrapOptions) {
  options = v;
}
