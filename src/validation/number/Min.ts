import { ValidationMetadata, ValidatorFunction } from '../ValidationMetadata';

const minValidator: ValidatorFunction = (
  objectToValidate: any,
  property: string,
  params: Record<string, any>,
) => {
  return objectToValidate[property] >= params.min;
};

const minValidationMetadata: ValidationMetadata = {
  validator: minValidator,
  defaultMessage: (propertyName, params) =>
    `Value of "${propertyName}" must be minimum ${params.min}.`,
};

export function Min(min: number) {
  return function (target, propertyKey: string) {
    return Reflect.defineMetadata(
      `__validator__.min.${propertyKey}`,
      { ...minValidationMetadata, params: { min } },
      target,
    );
  };
}
