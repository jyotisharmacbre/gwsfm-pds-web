import { memoize } from 'lodash';

export const onlyNumber = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export function fieldValidationLength(value, maxLength) {
  if (value && maxLength && value.length > maxLength) {
    return `Must have a maximum of ${maxLength} characters`;
  }
}

export function fieldValidationRequired(value, message) {
  if (
    !value ||
    (typeof value.trim === 'function' && value.trim() === '') ||
    (Array.isArray(value) && !value.length)
  ) {
    return message;
  }
}

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

export const Validate = {
  required: memoize(message => value =>
    fieldValidationRequired(value, message)
  ),
  maxLength: memoize(length => value => fieldValidationLength(value, length))
};
