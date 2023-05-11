import { ValidationMetadata, ValidatorFunction } from '../ValidationMetadata';

const lengthValidator: ValidatorFunction = (
  objectToValidate: any,
  property: string,
  params: Record<string, any>,
) => {
  // You can add string check!
  return (
    objectToValidate[property].length >= params.min &&
    objectToValidate[property].length <= params.max
  );
};

const lengthValidationMetadata: ValidationMetadata = {
  validator: lengthValidator,
  defaultMessage: (propertyName, params) =>
    `Length of "${propertyName}" must be between ${params.min} and ${params.max}`,
};

export function Length(min: number, max: number) {
  return function (target, propertyKey: string) {
    return Reflect.defineMetadata(
      `__validator__.length.${propertyKey}`,
      { ...lengthValidationMetadata, params: { min, max } },
      target,
    );
  };
}
