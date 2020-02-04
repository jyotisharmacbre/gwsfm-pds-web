import React, { useState, useEffect } from 'react';
import close_icon from '../../images/logo-black.png';
import language_icon from '../../images/language_icon.svg';
import * as actions from '../../../store/rootActions';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faUser,
  faBell,
  faHome,
  faPoundSign,
  faCoins
} from '@fortawesome/free-solid-svg-icons';

// @ts-ignore
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { userPreferencesGet, userPreferencesFormEdit, userPreferencesFormAdd, resetUserPreferencesState } from '../../../store/UserPreferencesForm/Actions';
import UserProfileForm from '../../Forms/UserProfileForm/UserProfileForm';
import { IUserPreferences } from '../../../store/UserPreferencesForm/Types/IUserPreferences';
import EventType from '../../../enums/EventType';
import Notify from '../../../enums/Notify';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import { getDisplayName, getDisplayEmail, logOut, getFirstName } from '../../../helpers/auth-helper';
import { toast } from 'react-toastify';
import { formatMessage } from '../../../Translations/connectedIntlProvider';
import { FormattedMessage } from 'react-intl';
import { displayUserName } from '../../../helpers/utility-helper';

interface IMapDispatchToProps {
  userPreferencesFormAdd: (
    form: IUserPreferences,
    event: EventType
  ) => void;
  userPreferencesFormEdit: (
    form: IUserPreferences,
    event: EventType
  ) => void;

  getUserPreferences: () => void;
  getAllLanguages: () => void;
  getAllCurrencies: () => void;
  resetUserPreferencesState: () => void;
  getProjectStatus: () => void;
  getCurrentUserProfile: () => void;
}

interface IProps {
  match: any;
}

interface IMapStateToProps {
  preferences: IUserPreferences;
  notify: Notify;
}

const ProfileMenu: React.FC<any> = props => {
  let history = useHistory();
  const [showMenu, setMenuVisibility] = useState(false);
  const [isEditable, makeEditable] = useState(false);


  useEffect(() => {
    props.getUserPreferences();
    props.getAllLanguages();
    props.getAllCurrencies();
    props.getCurrentUserProfile();
  }, [])

  useEffect(() => {
    if (props.notify == Notify.success) {
      toast.success(formatMessage("MESSAGE_SUCCESSFUL"));
      props.getUserPreferences();
      props.resetUserPreferencesState();
      props.getProjectStatus();
      setMenuVisibility(true);
      makeEditable(false);
    }
  }, [props.notify]);




  const handleEvent = (userPreferences: IUserPreferences, event: EventType) => {
    userPreferences.userPreferenceId == '' ||
      userPreferences.userPreferenceId == '00000000-0000-0000-0000-000000000000'
      ? props.userPreferencesFormAdd(userPreferences, event)
      : props.userPreferencesFormEdit(userPreferences, event);
  };

  const closePanel = () => {
    setMenuVisibility(true);
    makeEditable(false);
  }

  const handleBlur = (e) => {
    if (e.relatedTarget == null || !e.currentTarget.contains(e.relatedTarget)) {
      setMenuVisibility(false);
    } else {
      e && e.target.focus();
    }
  }

  return (
    <nav className="topbar">
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div className="col-sm-12">

            <div data-test="test-logo" className=
              {history.location.pathname == "/" || history.location.pathname == "/Pipeline" || history.location.pathname == "/Error" ? "d-md-block logo" : "logo"} >
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
                    <span className="badge badge-light">3</span>
                  </i>
                </a>
              </li>
              <li data-test='menu-container' onBlur={handleBlur}>
                <a href="#">
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
                      <span id="sm_none">{props.displayName ? props.displayName : '...'}</span>
                      <span className="down-arrow">
                      </span>
                    </a>

                    <div
                      id="dropLanguage"
                      className={`dropdown-menu dropdown-menu-right user-dropdown ${showMenu ? 'show' : 'hide'}`}
                      aria-labelledby="dropdownMenuLink"
                    >

                      <div className='language_wrap'>

                        {/* START EDIT FORM SECTION */}

                        <div className={`${isEditable ? 'show' : 'hide'}`}>

                          <UserProfileForm onSubmitForm={handleEvent}
                            redirectMenu={closePanel}
                            currencies={props.currencies}
                            languages={props.languages}
                            displayName={props.displayName}
                            displayEmail={props.displayEmail}
                          />
                        </div>

                        {/* END EDIT FORM SECTION */}

                        <ul className={`${!isEditable ? 'show' : 'hide'}`}>
                          <li>
                            <a href="#">
                              <i>
                                <FontAwesomeIcon className="" icon={faUser} />
                              </i>
                              <p className="title_name">{props.displayName}</p>
                              <span className="dsc">{props.displayEmail}</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i>
                                <img src={language_icon} alt="english translation icon" />
                              </i>
                              <p className="title_name">{formatMessage('LABEL_PREFERED_LANGUAGE')}</p>
                              <span className="dsc">{props.languageName}</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i>
                                <FontAwesomeIcon className="" icon={faCoins} />
                              </i>
                              <p className="title_name">{formatMessage('LABEL_PREFERED_CURRENCY')}</p>
                              <span className="dsc">{props.currencyName} {props.currencySymbol && `(${props.currencySymbol})`}</span>
                            </a>
                          </li>
                        </ul>
                        <div className={`${!isEditable ? 'show' : 'hide'}`}>

                          <div className='link_group'>
                            <a href="#" onClick={() => makeEditable(true)}>{formatMessage('BUTTON_EDIT')}</a>
                            <span>|</span>
                            <a href="#" onClick={logOut}>{formatMessage('BUTTON_SIGNOUT')}</a>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  id="sidebarCollapse"
                  className={history.location.pathname == "/" || history.location.pathname == "/Pipeline" ? "navbar-btn d-none" : "navbar-btn"} >
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
    userPreferences: state.userPreferences.preferences,
    languageId: state.userPreferences.preferences.languageId,
    languageName: state.userPreferences.preferences.languageName,
    currencyId: state.userPreferences.preferences.currencyId,
    currencySymbol: state.userPreferences.preferences.currencySymbol,
    currencyName: state.userPreferences.preferences.currencyName,
    currencies: state.lookup.currencies,
    languages: state.lookup.languages,
    notify: state.userPreferences.notify,
    displayName: displayUserName(state.userService.currentUserProfile),
    displayEmail: state.userService.currentUserProfile.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userPreferencesFormEdit: (userPreferences, event) =>
      dispatch(userPreferencesFormEdit(userPreferences, event)),
    userPreferencesFormAdd: (userPreferences, event) =>
      dispatch(userPreferencesFormAdd(userPreferences, event)),
    getUserPreferences: () => dispatch(userPreferencesGet()),
    getAllLanguages: () => dispatch(actions.getAllLanguages()),
    getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
    resetUserPreferencesState: () => dispatch(resetUserPreferencesState()),
    getProjectStatus: () => dispatch(actions.getProjectStatus()),
    getCurrentUserProfile: () => dispatch(actions.getCurrentUserProfileForEmailsService())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu)