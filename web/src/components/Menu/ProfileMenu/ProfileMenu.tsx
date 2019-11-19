import React from 'react';
import close_icon from '../../images/logo.jpg';

// @ts-ignore
import authentication from '@kdpw/msal-b2c-react';

export default function ProfileMenu(props: { Name?: string }) {
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
                  <i className="fa fa-home" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-bell" aria-hidden="true">
                    <span className="badge badge-light"></span>
                  </i>
                </a>
              </li>
              <li>
                <div className="dropdown show">
                  <a
                    className="btn btn-secondary dropdown-toggle p-0"
                    href="https://example.com"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span id="sm_none">{props.Name}</span>
                    <span className="down-arrow">
                      <img src="images/down-arrow.jpg" alt="down arow" />
                    </span>
                  </a>

                  <div
                    className="dropdown-menu dropdown-menu-right user-dropdown"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <button type="button">SAVE</button>
                    <form>
                      <h3>
                        Username Surname <span>Access Type</span>
                      </h3>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Location</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Eg. New York"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Preferred Currency
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Eg. American Dollars"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </li>
              <li id="sm_none">
                <a className="" onClick={() => authentication.signOut()}>
                  logout
                </a>
              </li>
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
