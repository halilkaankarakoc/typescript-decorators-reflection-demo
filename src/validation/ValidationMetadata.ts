export type ValidatorFunction = (
  objectToValidate: any,
  property: string,
  params?: Record<string, any>,
) => boolean;

export interface ValidationMetadata {
  validator: ValidatorFunction;
  defaultMessage: (property: string, params?: Record<string, any>) => string;
  params?: Record<string, any>;
}
