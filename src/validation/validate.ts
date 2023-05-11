import { ValidationMetadata } from './ValidationMetadata';

export const validate = (objectToValidate: any) => {
  const metadataKeys = Reflect.getMetadataKeys(objectToValidate);
  const validationMetadataKeys = metadataKeys.filter((metaKey) =>
    metaKey.includes('__validator__'),
  );
  const validationMetadatas: Record<string, ValidationMetadata> =
    validationMetadataKeys.reduce((acc, validationMetaKey) => {
      return {
        ...acc,
        [validationMetaKey]: Reflect.getMetadata(
          validationMetaKey,
          objectToValidate,
        ),
      };
    }, {});

  return Object.keys(validationMetadatas).reduce(
    (acc, validationMetadataKey) => {
      const validationMetadata = validationMetadatas[validationMetadataKey];
      const propertyName = validationMetadataKey.split('.').at(-1);
      const validationResult = validationMetadata.validator(
        objectToValidate,
        propertyName,
        validationMetadata.params,
      );
      return validationResult
        ? acc
        : {
            errors: [
              ...acc.errors,
              validationMetadata.defaultMessage(
                propertyName,
                validationMetadata.params,
              ),
            ],
          };
    },
    { errors: [] as string[] },
  );
};
