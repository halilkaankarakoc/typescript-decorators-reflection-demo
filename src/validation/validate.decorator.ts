import { validate } from './validate';

export function Validate<T extends { new (...args: any[]): any }>(Base: T) {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
      const result = validate(this);
      if (result.errors.length) {
        throw new Error(JSON.stringify(result.errors));
      }
    }
  };
}
