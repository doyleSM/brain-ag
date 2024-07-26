import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { isValid as isCNPJValid } from './cnpj.validator';
import { isValid as isCPFValid } from './cpf.validator';

export function IsCpfCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCpfCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          return isCPFValid(value) || isCNPJValid(value);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        defaultMessage(args: ValidationArguments) {
          return 'CPF or CNPJ is invalid';
        },
      },
    });
  };
}
