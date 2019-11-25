import { alphaNumeric, onlyNumber, Validate } from './fieldValidations';

describe('Validation', () => {
  it('Required', () => {
    let result = Validate.required('Test');
    expect(result()).toBeDefined();
  });
});
