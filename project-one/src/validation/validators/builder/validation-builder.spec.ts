import {
  RequiredFieldValidation,
  EmailValidation,
  MinLegthValidation,
} from '@/validation/validators/index.validators';
import { ValidationBuilder as sut } from './validation-builder';
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation';
import faker from 'faker';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('should return EmailValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('should return CompareFieldsValidation', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validations = sut.field(field).sameAs(fieldToCompare).build();
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare),
    ]);
  });

  test('should return list of Validations', () => {
    const field = faker.database.column();
    const length = faker.datatype.number();
    const validations = sut.field(field).required().min(length).email().build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLegthValidation(field, length),
      new EmailValidation(field),
    ]);
  });
});
