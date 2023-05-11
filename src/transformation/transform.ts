import { TransformationMetadata } from './ValidationMetadata';

export const transform = (objectToTransform: any) => {
  const metadataKeys = Reflect.getMetadataKeys(objectToTransform);
  const transformationMetadataKeys = metadataKeys.filter((metaKey) =>
    metaKey.includes('__transformer__'),
  );
  const transformationMetadatas: Record<string, TransformationMetadata> =
    transformationMetadataKeys.reduce((acc, transformationMetadaKey) => {
      return {
        ...acc,
        [transformationMetadaKey]: Reflect.getMetadata(
          transformationMetadaKey,
          objectToTransform,
        ),
      };
    }, {});

  Object.keys(transformationMetadatas).forEach((transformationMetadataKey) => {
    const transformationMetadata =
      transformationMetadatas[transformationMetadataKey];

    const property = transformationMetadataKey.split('.').at(-1);

    transformationMetadata.transform(
      objectToTransform,
      property,
      transformationMetadata.params,
    );
  });
};
