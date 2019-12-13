import React, { useState } from 'react';
import close_icon from '../../images/logo-black.png';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faUser,
  faBell,
  faHome
} from '@fortawesome/free-solid-svg-icons';

// @ts-ignore
import authentication from '@kdpw/msal-b2c-react';

export default function ProfileMenu(props: { Name?: string }) {

    const [showMenu, setMenuVisibility] = useState(false);
  
  return (
    <nav className="topbar">
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div className="col-sm-12">
            <div className="logo">
              <img src={close_icon} alt="close" />
            </div>
            <ul className="icons-blocks">
              <li id="sm_none">
                <a href="#">
                  <FontAwesomeIcon className="" icon={faHome} />
                </a>
              </li>
              <li>
                <a href="#">
                  <i>
                    <FontAwesomeIcon className="" icon={faBell} />
                    <span className="badge badge-light"></span>
                  </i>
                </a>
              </li>
              <li>
                <div className="dropdown show">
                  <a
                    onClick={() => setMenuVisibility(!showMenu)}
                    className="btn btn-secondary dropdown-toggle p-0"
                    href="#"
                    id="js-usertext"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon className="" icon={faUser} />
                    <span id="sm_none">{props.Name && `Hello, ${props.Name}`}</span>
                    <span className="down-arrow">
                      <FontAwesomeIcon className="" icon={faAngleDown} />
                    </span>
                  </a>

                  <div
                    className={`dropdown-menu dropdown-menu-right user-dropdown ${showMenu? 'show': 'hide'}`}
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="language_wrap">
                      <ul>
                        <li>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon className="" icon={faUser} />
                            </i>
                            <p className="title_name">{props.Name && props.Name}</p>
                            <span className="dsc">user</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon className="" icon={faUser} />
                            </i>
                            <p className="title_name">English</p>
                            <span className="dsc">preferred language</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon className="" icon={faUser} />
                            </i>
                            <p className="title_name">$</p>
                            <span className="dsc">preferred currency</span>
                          </a>
                        </li>
                      </ul>
                      <div className="link_group">
                        <a href="#">EDIT</a>
                        <span>|</span>
                        <a href="#">SIGN OUT</a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              {/* <li id="sm_none">
                <a className="" onClick={() => authentication.signOut()}>
                  logout
                </a>
              </li> */}
              <li>
                <button
                  type="button"
                  id="sidebarCollapse"
                  className="navbar-btn"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
