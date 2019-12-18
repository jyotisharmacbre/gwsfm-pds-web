import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';

export function MainTitle(props: any) {
  return (
    <div className="col-md-6 float-left">
      <h1>{props.children}</h1>
    </div>
  );
}

MainTitle.propTypes = {
  children: PropTypes.node
};
