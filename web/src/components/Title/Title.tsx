import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
// import { FormattedMessage } from 'react-intl';

export function MainTitle(props: any) {
  return (
    <div className="row align-items-center mb-3">
                <div className="col-lg-6">
                  <h1 className="mb-2">{props.children}</h1>
                </div>
                <div className="col-lg-6 d-flex justify-content-xl-end justify-content-start">
                  <button
                    className="download_pdf_btn"
                    type="button"
                  ><FontAwesomeIcon className="" icon={faDownload} /> DOWNLOAD PDF
                  </button>
                </div>
              </div>
    
  );
}

MainTitle.propTypes = {
  children: PropTypes.node
};
