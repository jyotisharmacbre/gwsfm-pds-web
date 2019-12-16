import React, { useState } from 'react';
import close_icon from '../../images/logo-black.png';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../store/rootActions';
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
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { userPreferencesGet, userPreferencesFormEdit } from '../../../store/UserPreferencesForm/Actions';
import UserProfileForm from '../../Forms/UserProfileForm/UserProfileForm';
import { IUserPreferences } from '../../../store/UserPreferencesForm/Types/IUserPreferences';
import EventType from '../../../enums/EventType';
import Notify from '../../../enums/Notify';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import { getDisplayName } from '../../../helpers/auth-helper';

interface IMapDispatchToProps {
  userPreferencesFormAdd: (
    form: IUserPreferences,
    event: EventType
  ) => void;
  userPreferencesFormEdit: (
    form: IUserPreferences,
    event: EventType
  ) => void;

  getUserPreferences();
  getAllLanguages();
  getAllCurrencies();
}

interface IProps {
  match: any;
}

interface IMapStateToProps {
  form: IUserPreferences;
  notify: Notify;
  event: EventType;
}

const ProfileMenu: React.FC<any> = props => {
  const [showMenu, setMenuVisibility] = useState(false);
  const [isEditable, makeEditable] = useState(false);




  const handleEvent = (userPreferences: IUserPreferences, event: EventType) => {
    userPreferences.userPreferenceId == ''
      ? props.userPreferencesFormAdd(userPreferences, event)
      : props.userPreferencesFormEdit(userPreferences, event);
  };


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
                    <span id="sm_none">{getDisplayName() && `Hello, ${getDisplayName()}`}</span>
                    <span className="down-arrow">
                      <FontAwesomeIcon className="" icon={faAngleDown} />
                    </span>
                  </a>

                  <div
                    className={`dropdown-menu dropdown-menu-right user-dropdown ${showMenu ? 'show' : 'hide'}`}
                    aria-labelledby="dropdownMenuLink"
                  >

                    <div className='language_wrap'>

                      {/* START EDIT FORM SECTION */}

                      <div className={`${isEditable ? 'show' : 'hide'}`}>

                        <UserProfileForm onSubmitForm={handleEvent} />
                      </div>

                      {/* END EDIT FORM SECTION */}

                      <ul className={`${!isEditable ? 'show' : 'hide'}`}>
                        <li>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon className="" icon={faUser} />
                            </i>
                            <p className="title_name">user</p>
                            {/* <span className="dsc">{props.Name && props.Name}</span> */}
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon className="" icon={faUser} />
                            </i>
                            <p className="title_name">preferred language</p>
                            <span className="dsc">{props.languageName}</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon className="" icon={faUser} />
                            </i>
                            <p className="title_name">preferred currency</p>
                            <span className="dsc">{props.currencySymbol}</span>
                          </a>
                        </li>
                      </ul>
                      <div className="link_group">
                        <a className={`${!isEditable ? 'show' : 'hide'}`} onClick={() => makeEditable(!isEditable)}>EDIT</a>
                        <a className={`${isEditable ? 'show' : 'hide'}`} onClick={() => makeEditable(!isEditable)}>Cancel</a>

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
const mapStateToProps = (state: IState) => {
  return {
    userPreferenceId: state.userPreferences.form.userPreferenceId,
    languageId: state.userPreferences.form.languageId,
    languageName: state.userPreferences.form.languageName,
    currencyId: state.userPreferences.form.currencyId,
    currencySymbol: state.userPreferences.form.currencySymbol,
    currencyName: state.userPreferences.form.currencyName,
    currencies: state.lookup.currencies,
    languages: state.lookup.languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userPreferencesFormEdit: (userPreferences, event) =>
      dispatch(userPreferencesFormEdit(userPreferences, event)),
    getUserPreferences: dispatch(userPreferencesGet()),
    getAllLanguages: dispatch(actions.getAllLanguages()),
    getAllCurrencies: dispatch(actions.getAllCurrencies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu)