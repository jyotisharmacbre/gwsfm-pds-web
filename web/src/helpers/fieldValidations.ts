import { memoize } from 'lodash';
import { formatMessage } from './../Translations/connectedIntlProvider';

export const onlyNumber = value =>
  value && isNaN(Number(value))
    ? formatMessage('VALIDATION_NUMBER')
    : undefined;

export function fieldValidationLength(value, maxLength) {
  if (value && maxLength && value.length > maxLength) {
    return `${formatMessage('FIELD_VALIDATION_KEY', {
      0: formatMessage(maxLength)
    })}`;
  }
}

export function fieldValidationRequired(value, message) {
  if (
    !value ||
    (typeof value.trim === 'function' && value.trim() === '') ||
    (Array.isArray(value) && !value.length)
  ) {
    return `${formatMessage('VALIDATION_IS_REQUIRED', {
      0: formatMessage(message)
    })}`;
  }
}

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? formatMessage('VALIDATION_ONLY_ALPHA_NUM')
    : undefined;

export const Validate = {
  require: message => value =>
    fieldValidationRequired(value, message)
  ,
  required: memoize(message => value =>
    fieldValidationRequired(value, message)
  ),
  maxLength: memoize(length => value => fieldValidationLength(value, length))
};
