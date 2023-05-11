import { transform } from './transform';

export function Transform<T extends { new (...args: any[]): any }>(Base: T) {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
      transform(this);
    }
  };
}
