import React from 'react';
import clsx from 'clsx';
import { injectIntl } from 'react-intl';
import Translate from '../../../Translations/translate';
import { Link } from 'react-router-dom';
import cbre_icon from '../../images/logo-black.jpg';
import upload_icon from '../../images/upload-icon.jpg';

const LeftMenu: React.FC = (props: any) => {
  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <div id="sm_none" className="logo">
          <img src={cbre_icon} alt="CBRE PDS" />
        </div>
        <div className="cross-menu">
          MENU
          <button type="button" id="cross-inner" className="cross-sidebar">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <ul id="homeMenu" className="list-unstyled components">
        <p className="upload mb-0">
          <img src={upload_icon} alt="upload icon" />
          upload library
        </p>
        <li className="active">
          <Link
            to={{
              pathname: '/Project'
            }}
          >
            customer enquiry
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/ProjectOverview'
            }}
          >
            project overview
          </Link>
        </li>
        <li className="">
          <Link
            to="/"
            data-target="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle collapsed"
          >
            justification & authorisation
          </Link>
          <ul className="collapse list-unstyled" id="homeSubmenu">
            <li className="subactive">
              <Link to="/">preliminaries</Link>
            </li>
            <li>
              <Link to="/">subcontractors</Link>
            </li>
            <li>
              <Link to="/">discounts </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/">review & submit</Link>
        </li>
        <li>
          <Link to="/">review & approve</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default injectIntl(LeftMenu);
