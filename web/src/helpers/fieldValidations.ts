import { memoize } from 'lodash';
import {globalIntl} from './../App';

export const onlyNumber = (value) =>
  value && isNaN(Number(value))
    ? globalIntl.formatMessage('VALIDATION_NUMBER')
    : undefined;

export function fieldValidationLength(value, maxLength) {
  if (value && maxLength && value.length > maxLength) {
    return `${globalIntl.formatMessage('FIELD_VALIDATION_KEY', {
      0: globalIntl.formatMessage(maxLength)
    })}`;
  }
}

export function fieldValidationRequired(value, message) {
  if (
    !value ||
    (typeof value.trim === 'function' && value.trim() === '') ||
    (Array.isArray(value) && !value.length)
  ) {
    return `${globalIntl.formatMessage('VALIDATION_IS_REQUIRED', {
      0: globalIntl.formatMessage(message)
    })}`;
  }
}

export const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? globalIntl.formatMessage('VALIDATION_ONLY_ALPHA_NUM')
    : undefined;

export const Validate = {
  required: memoize(message => value =>
    fieldValidationRequired(value, message)
  ),
  maxLength: memoize(length => value =>
    fieldValidationLength(value, length)
  )
};