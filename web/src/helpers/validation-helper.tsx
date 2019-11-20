export const isRequired = value => (value ? undefined : 'isRequired');

export const isEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'isEmail'
    : undefined;

const maxLength = (max, value) =>
  value && value.length > max ? `maxLength30` : undefined;

export const maxLength30 = value => maxLength(10, value);

export const number = value => (value && isNaN(Number(value)) ? false : true);

export const minValue = min => value => (value && value < min ? false : true);
