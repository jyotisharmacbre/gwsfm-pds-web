import React from 'react';
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
import { Link,useHistory } from 'react-router-dom';
import { History } from 'history';

export default function ProfileMenu(props: { Name?: string}) {
  let history=useHistory();
  return (
    <nav className="topbar">
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div className="col-sm-12">
             
            <div className={history.location.pathname=="/" ||history.location.pathname=="/Pipeline"?"d-md-block logo":"logo" } >
              <Link data-test=""
                to={{
                  pathname: "/"
                }}
              >
                <img src={close_icon} alt="close" />
              </Link>
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
                    className="btn btn-secondary dropdown-toggle p-0"
                    href="#"
                    id="js-usertext"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon className="" icon={faUser} />
                    <span id="sm_none">{props.Name}</span>
                    <span className="down-arrow">
                      <FontAwesomeIcon className="" icon={faAngleDown} />
                    </span>
                  </a>

                  <div
                    className="dropdown-menu dropdown-menu-right user-dropdown"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="language_wrap">
                      <ul>
                        <li>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon className="" icon={faUser} />
                            </i>
                            <p className="title_name">First Name Last Name</p>
                            <span className="dsc">access type</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon className="" icon={faUser} />
                            </i>
                            <p className="title_name">current location</p>
                            <span className="dsc">london-UK</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon className="" icon={faUser} />
                            </i>
                            <p className="title_name">preferred currency</p>
                            <span className="dsc">sterling pound</span>
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
                  className={history.location.pathname=="/" ||history.location.pathname=="/Pipeline"?"navbar-btn d-none":"navbar-btn" } >
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
