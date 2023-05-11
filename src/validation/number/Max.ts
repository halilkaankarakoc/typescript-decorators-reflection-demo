import { ValidationMetadata, ValidatorFunction } from '../ValidationMetadata';

const maxValidator: ValidatorFunction = (
  objectToValidate: any,
  property: string,
  params: Record<string, any>,
) => {
  return objectToValidate[property] <= params.max;
};

const maxValidationMetadata: ValidationMetadata = {
  validator: maxValidator,
  defaultMessage: (propertyName, params) =>
    `Value of "${propertyName}" must be maximum ${params.max}.`,
};

export function Max(max: number) {
  return function (target, propertyKey: string) {
    return Reflect.defineMetadata(
      `__validator__.max.${propertyKey}`,
      { ...maxValidationMetadata, params: { max } },
      target,
    );
  };
}
