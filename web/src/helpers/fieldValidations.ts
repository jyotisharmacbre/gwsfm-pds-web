export const required = value =>
  value || typeof value === 'number' ? undefined : 'required';

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength1000 = maxLength(1000);

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;
