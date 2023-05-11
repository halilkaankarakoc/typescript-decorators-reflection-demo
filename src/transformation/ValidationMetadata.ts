export type TransformerFunction = (
  objectToValidate: any,
  property: string,
  params?: Record<string, any>,
) => void;

export interface TransformationMetadata {
  transform: TransformerFunction;
  params?: Record<string, any>;
}
