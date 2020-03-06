import React, { useState, useEffect, useContext } from 'react';
import close_icon from '../../images/PDS_Logo_White.png';
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
import { Link, useHistory, match } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { userPreferencesGet, userPreferencesFormEdit, userPreferencesFormAdd, resetUserPreferencesState } from '../../../store/UserPreferencesForm/Actions';
import UserProfileForm from '../../Forms/UserProfileForm/UserProfileForm';
import { IUserPreferences } from '../../../store/UserPreferencesForm/Types/IUserPreferences';
import EventType from '../../../enums/EventType';
import Notify from '../../../enums/Notify';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import { getDisplayName, getDisplayEmail, getFirstName } from '../../../helpers/auth-helper';
import { toast } from 'react-toastify';
import { formatMessage } from '../../../Translations/connectedIntlProvider';
import { FormattedMessage } from 'react-intl';
import { displayUserName } from '../../../helpers/utility-helper';
import useAuthContext from '../../../hooks/useAuthContext';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { Label } from '@material-ui/icons';
import  Notification  from '../Notification/index'



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
  getProjectDetail: (projectId: string) => void;

}

interface IProps {
  match: match<{ projectId: string }>;
}

interface IMapStateToProps {
  preferences: IUserPreferences;
  loading: boolean;
  event: EventType;
  notify: Notify;
  token: string;
  project: IProjectDetail;

}

const ProfileMenu: React.FC<any> = props => {

  let history = useHistory();
  const authProvider = useAuthContext();
  const [showMenu, setMenuVisibility] = useState(false);
  const [showNotify, setNotificationVisibility] = useState(false);
  const [isEditable, makeEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (props.token) {
      props.getProjectStatus();
      props.getUserPreferences();
      props.getAllLanguages();
      props.getAllCurrencies();
      props.getCurrentUserProfile();
      props.getNotifications();
    }
   }, [props.token])

  useEffect(() => {
    if (props.notify == Notify.success) {
      toast.success(formatMessage("MESSAGE_SUCCESSFUL"));
      props.getUserPreferences();
      props.resetUserPreferencesState();
      props.getProjectStatus();
      setMenuVisibility(true);
      setNotificationVisibility(true);
      makeEditable(false);
      setLoading(false);
    }
  }, [props.notify]);


  const handleEvent = (userPreferences: IUserPreferences, event: EventType) => {
    setLoading(true);
    userPreferences.userPreferenceId == '' ||
      userPreferences.userPreferenceId == '00000000-0000-0000-0000-000000000000'
      ? props.userPreferencesFormAdd(userPreferences, event)
      : props.userPreferencesFormEdit(userPreferences, event);
  };

  const closePanel = () => {
    setMenuVisibility(true);
    setNotificationVisibility(true);
    makeEditable(false);
  }

  const handleBlur = (e) => {
    if (e.relatedTarget == null || !e.currentTarget.contains(e.relatedTarget)) {
      setMenuVisibility(false);
      setNotificationVisibility(false);
    } else {
      e && e.target.focus();
    }
  }

  const showNav = () => {
    return history.location.pathname == "/" ||
      history.location.pathname == "/Pipeline" ||
      history.location.pathname == "/Error";
  }

  const showProjectName = () => {
    return history.location.pathname == "/" ||
      history.location.pathname == "/Pipeline"
  }

  
  //add & remove class for pipeline and dashboard page
  const showClass = () => {
    return history.location.pathname == "/" ||
      history.location.pathname == "/Pipeline"
  }
  const logout = () => {
    authProvider.logout();
  }

  //Add code for on click rotate the dropdown arrow
  const userPreferencedropdown = () => {
    var element: any = document.getElementById('user__dropdown');
    if (element != null) {
        var isClassExists = element.classList.contains('active');
        if (isClassExists) {
            element.classList.remove('active');
        } else {
            element.classList.add('active');
        }
    }
};

  return (
    <nav className="topbar">
      <div className="container-fluid" >
        <div className="row d-flex align-items-center">
          <div className=
            {
              showClass() ?
                "col-sm-12 d-flex justify-content-between align-items-center" :
                "col-sm-12 d-flex justify-content-between align-items-center justify-content-md-end"} >

            {!showProjectName() && 
            (<div className="project_name_title d-md-block d-none"><label>{props.project?.name}</label></div>)}
            
            <div data-test="test-logo" className=
              {showNav() ? "d-md-block logo" : "logo"} >
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
              <li onBlur={handleBlur}>
                <a href="#"
                onClick={() => setNotificationVisibility(!showNotify)}>
                  <Notification 
                 notifications = {props.notifications}
                 showNotification = {showNotify}
                 lookups = {props.lookups}
                 />
                </a>
              </li>
              <li data-test='menu-container' onBlur={handleBlur}>
                <a href="#" onClick={() => userPreferencedropdown()}>
                  <div className="dropdown show">
                    <div
                      onClick={() => setMenuVisibility(!showMenu)}
                      className="btn btn-secondary dropdown-toggle p-0 inner-cont"
                      id="js-usertext"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon className="" icon={faUser} />
                      <span id="sm_none">{props.displayName ? props.displayName : '...'}</span>
                      <span id="user__dropdown" className="down-arrow">
                      </span>
                    </div>

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
                            loading={loading}
                            event={props.event}
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
                            <a href="#" onClick={logout}>{formatMessage('BUTTON_SIGNOUT')}</a>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li className=
                {
                  showClass() ?
                    "m-0" :
                    "default"}
              >
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
    displayEmail: state.userService.currentUserProfile.email,
    loading: state.userPreferences.loading,
    event: state.userPreferences.event,
    token: state.auth.token,
    project: state.project.form,
    notifications: state.notifications.notifications,
    lookups: state.lookup.projectstatus,
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
    getCurrentUserProfile: () => dispatch(actions.getCurrentUserProfileForEmailsService()),
    getNotifications: () => dispatch(actions.getNotifications())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu)