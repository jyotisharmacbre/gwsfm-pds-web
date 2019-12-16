import React, { useState, useEffect } from 'react';
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
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { userPreferencesGet } from '../../../store/UserPreferencesForm/Actions';
import { Field, InjectedFormProps, formValueSelector, reduxForm } from 'redux-form';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import { Validate } from '../../../helpers/fieldValidations';
import { FormattedMessage } from 'react-intl';
import { IUserPreferences } from '../../../store/UserPreferencesForm/Types/IUserPreferences';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import EventType from '../../../enums/EventType';
import { getDisplayName } from '../../../helpers/auth-helper';
import { ILanguage } from '../../../store/Lookups/Types/ILanguage';

interface Props {
  onSubmitForm: (data: IUserPreferences, event: EventType) => void;
}

const UserProfileForm: React.FC<Props &
  InjectedFormProps<IUserPreferences, Props>> = (props: any, Name: any) => {
    const { handleSubmit } = props;
debugger;
    return (
      <form onSubmit={handleSubmit} noValidate={true}>
        <div>
          {/* START EDIT FORM SECTION */}

          <ul>
            <li>
              <a>
                <i>
                  <FontAwesomeIcon className="" icon={faUser} />
                </i>
                <p className="title_name">user</p>
                <span id="sm_none">{getDisplayName() && `Hello, ${getDisplayName()}`}</span>
              </a>
            </li>
            <li>
              <a>
                <i>
                  <FontAwesomeIcon className="" icon={faUser} />
                </i>
                <p className="title_name">preferred language</p>
                <Field
                  name="languageId"
                  component={PdsFormSelect}
                  validate={Validate.required('LABEL_LANGUAGE')}
                  placeholderKey="PLACEHOLDER_LANGUAGE"
                  messageKey="MESSAGE_LANGUAGE"
                >
                  <FormattedMessage id="PLACEHOLDER_LANGUAGE">
                    {message => <option value="">{message}</option>}
                  </FormattedMessage>
                  {props.languages &&
                    props.languages.map((data: ILanguage, i: number) => {
                      return (
                        <option
                          key={data.languageID}
                          value={data.languageID}
                        >
                          {data.name}
                        </option>
                      );
                    })}
                </Field>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                  <FontAwesomeIcon className="" icon={faUser} />
                </i>
                <p className="title_name">preferred currency</p>
                <Field
                  name="currencyId"
                  component={PdsFormSelect}
                  validate={Validate.required('LABEL_CURRENCY')}
                  placeholderKey="PLACEHOLDER_CURRENCY"
                  messageKey="MESSAGE_CURRENCY"
                >
                  <FormattedMessage id="PLACEHOLDER_CURRENCY">
                    {message => <option value="">{message}</option>}
                  </FormattedMessage>
                  {props.currencies &&
                    props.currencies.map((data: ICurrency, i: number) => {
                      return (
                        <option
                          key={data.currencyId}
                          value={data.currencyId}
                        >
                          {data.currencyName}
                        </option>
                      );
                    })}
                </Field>
              </a>
            </li>
          </ul>



          <button type="button" name="save"
            onClick={handleSubmit(values => props.onSubmit(values))}>
            <FormattedMessage id="BUTTON_SAVE" />
          </button>

          {/* END EDIT FORM SECTION */}
        </div>
      </form>
    );
  }


const mapStateToProps = (state: IState) => {
  return {
    userPreferenceId: state.userPreferences.form.userPreferenceId,
    //languageId: state.userPreferences.form.languageId,
    languageName: state.userPreferences.form.languageName,
    // currencyId: state.userPreferences.form.currencyId,
    currencySymbol: state.userPreferences.form.currencySymbol,
    currencyName: state.userPreferences.form.currencyName,
    currencies: state.lookup.currencies,
    currencyId: selector(state, 'currencyId'),
    languageId: selector(state, 'languageId'),
    languages: state.lookup.languages,
  }
}

const form = reduxForm<IUserPreferences, Props>({
  form: 'UserProfileForm',
  enableReinitialize: true
})(UserProfileForm);

const selector = formValueSelector('UserProfileForm');


export default connect(mapStateToProps)(form)