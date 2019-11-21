export const required = value =>
  value || typeof value === 'number' ? undefined : 'required';

const maxLength = max => value =>
  value && value.length > max ? `maxLength${max}` : undefined;

export const maxLength1000 = maxLength(1000);

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? 'alphaNumeric' : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'email'
    : undefined;

export const number = value =>
  value && isNaN(Number(value)) ? 'number' : undefined;

export const minValue = min => value =>
  value && value < min ? `minValue${min}` : undefined;
