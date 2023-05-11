import {
  TransformationMetadata,
  TransformerFunction,
} from '../ValidationMetadata';

const joinTransformer: TransformerFunction = (
  objectToTransform: any,
  property: string,
  params: Record<string, any>,
) => {
  objectToTransform[property] = params.properties
    .map((prop) => objectToTransform[prop])
    .join(params.separator);
};

const joinTransformationMetadata: TransformationMetadata = {
  transform: joinTransformer,
};

export function Join(properties: string[], separator: string) {
  return function (target, propertyKey: string) {
    return Reflect.defineMetadata(
      `__transformer__.join.${properties.join(separator)}.${propertyKey}`,
      { ...joinTransformationMetadata, params: { properties, separator } },
      target,
    );
  };
}
