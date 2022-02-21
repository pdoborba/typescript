import { FieldValidation } from '@/validation/protocols/field-validation';
import { InvalidFieldError } from '@/validation/errors/index.errors.validation';

export class MinLegthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLentgh: number) {}

  validate(input: object): Error {
    return input[this.field]?.length < this.minLentgh
      ? new InvalidFieldError()
      : null;
  }
}
