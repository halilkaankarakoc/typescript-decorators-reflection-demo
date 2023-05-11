import { ValidationMetadata, ValidatorFunction } from '../ValidationMetadata';

const stringValidator: ValidatorFunction = (
  objectToValidate: any,
  property: string,
) => {
  return (
    objectToValidate[property] instanceof String ||
    typeof objectToValidate[property] === 'string'
  );
};

const isStringValidationMetadata: ValidationMetadata = {
  validator: stringValidator,
  defaultMessage: (propertyName) => `Type of "${propertyName}" must be string.`,
};

export function IsString() {
  return function (target, propertyKey: string) {
    return Reflect.defineMetadata(
      `__validator__.isString.${propertyKey}`,
      isStringValidationMetadata,
      target,
    );
  };
}
