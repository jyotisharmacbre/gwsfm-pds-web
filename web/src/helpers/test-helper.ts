import checkPropTypes from 'check-prop-types';

export const findByTestAtrr = (component: any, attr: string) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const checkProps = (component: any, expectedProps: any) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    'props',
    component.name
  );
  return propsErr;
};
