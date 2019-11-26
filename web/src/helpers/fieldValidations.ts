import { memoize } from 'lodash';
import Translate from '../Translations/translate';

export const onlyNumber = (value, props) =>
  value && isNaN(Number(value))
    ? Translate.getLabel(props, 'VALIDATION_NUMBER')
    : undefined;

export function fieldValidationLength(value, maxLength, props) {
  if (value && maxLength && value.length > maxLength) {
    return `${Translate.getLabel(props, 'VALIDATION_MAX')} ${Translate.getLabel(
      props,
      maxLength
    )} ${Translate.getLabel(props, 'characters')}`;
  }
}

export function fieldValidationRequired(value, message, props) {
  if (
    !value ||
    (typeof value.trim === 'function' && value.trim() === '') ||
    (Array.isArray(value) && !value.length)
  ) {
    return `${Translate.getLabel(props, message)} ${Translate.getLabel(
      props,
      'VALIDATION_IS_REQUIRED'
    )}`;
  }
}

export const alphaNumeric = (value, props) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? Translate.getLabel(props, 'VALIDATION_ONLY_ALPHA_NUM')
    : undefined;

export function fieldValidationNoLocale(value, message) {
  if (
    !value ||
    (typeof value.trim === 'function' && value.trim() === '') ||
    (Array.isArray(value) && !value.length)
  ) {
    return `${message} is required`; //No Locale
  }
}

export const Validate = {
  required: memoize(message => value =>
    fieldValidationNoLocale(value, message)
  ),

  require: memoize((props, message) => value =>
    fieldValidationRequired(value, message, props)
  ),
  maxLength: memoize((props, length) => value =>
    fieldValidationLength(value, length, props)
  ),
  onlyNumber: memoize(props => value => onlyNumber(value, props)),
  alphaNumeric: memoize(props => value => alphaNumeric(value, props))
};
