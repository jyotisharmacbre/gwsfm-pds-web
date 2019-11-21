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
