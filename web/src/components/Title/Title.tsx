import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
// import { FormattedMessage } from 'react-intl';

export function MainTitle(props: any) {
  return (
    <div className="row align-items-center mb-3 mt-md-4 mt-2">
      <div className="col-lg-6">
        <h1 className="mb-2 mt-0">{props.children}</h1>
      </div>

    </div>

  );
}

MainTitle.propTypes = {
  children: PropTypes.node
};
