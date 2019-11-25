import React from 'react';

export const updateObject = (oldState, updatedProperties) => {
  return {
    ...oldState,
    ...updatedProperties
  };
};

export const getPropertyName = (obj, expression) => {
  var res = {};
  Object.keys(obj).map(k => {
    res[k] = () => k;
  });
  return expression(res)();
};

export const getDropdown = (data, value) => {
  let result =
    data &&
    data.map((status: any, i: number) => {
      if (status.lookupItem == value) {
        return (
          <option key={status.lookupId} value={+status.lookupKey}>
            {status.description}
          </option>
        );
      }
    });
  return result;
};
