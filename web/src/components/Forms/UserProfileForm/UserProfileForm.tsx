import React from 'react';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
  faUser, faCoins
} from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import language_icon from '../../images/language_icon.svg';
import { IState } from '../../../store/state';
import { Field, InjectedFormProps, formValueSelector, reduxForm } from 'redux-form';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import { Validate } from '../../../helpers/fieldValidations';
import { FormattedMessage } from 'react-intl';
import { IUserPreferences } from '../../../store/UserPreferencesForm/Types/IUserPreferences';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import EventType from '../../../enums/EventType';
import { ILanguage } from '../../../store/Lookups/Types/ILanguage';
import { formatMessage } from '../../../Translations/connectedIntlProvider';
import { CircularProgress } from '@material-ui/core';

interface Props {
  onSubmitForm: (data: IUserPreferences, event: EventType) => void;
  redirectMenu: () => void;
  currencies: ICurrency;
  languages: ILanguage;
  displayName: string;
  displayEmail: string;
  loading: boolean;

}

let UserProfileForm: React.FC<Props &
  InjectedFormProps<IUserPreferences, Props>> = (props: any, Name: any) => {

    const { handleSubmit, redirectMenu } = props;

    return (
      <form onSubmit={handleSubmit} noValidate={true}>
        <div>
          {/* START EDIT FORM SECTION */}

          <ul>
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
              <a>
                <i>
                <img src={language_icon} alt="english translation icon" />
                </i>
                <p className="title_name">{formatMessage('LABEL_PREFERED_LANGUAGE')}</p>
                <div className="select-wrapper header_select_wrapper">
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
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                <FontAwesomeIcon className="" icon={faCoins} />
                </i>
                <p className="title_name">{formatMessage('LABEL_PREFERED_CURRENCY')}</p>
                <div className="select-wrapper header_select_wrapper">
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
                    props.currencies.filter(x=>x.isActive === true).map((data: ICurrency, i: number) => {
                      return (
                        <option
                          key={data.currencyId}
                          value={data.currencyId}
                        >
                        {data.currencyName} {data.currencySymbol && `(${data.currencySymbol})`}
                        </option>
                      );
                    })}
                </Field>
                </div>
              </a>
            </li>
          </ul>


          <div className='link_group'>
            <a href="#" data-test="save" onClick={handleSubmit(values => props.onSubmitForm(values))}>
            {(props.loading) && <CircularProgress />}
              <FormattedMessage id="BUTTON_SAVE" /></a>
            <span>|</span>
            <a href="#" data-test="cancel" onClick={redirectMenu}>{formatMessage('BUTTON_CANCEL')}</a>
          </div>

          {/* END EDIT FORM SECTION */}
        </div>
      </form>
    );
  }


const mapStateToProps = (state: IState) => {
  return {
    initialValues: state.userPreferences.preferences,
    currencyId: selector(state, 'currencyId'),
    languageId: selector(state, 'languageId'),
  }
}


const form = reduxForm<IUserPreferences, Props>({
  form: 'UserProfileForm',
  enableReinitialize: true
})(UserProfileForm);

const selector = formValueSelector('UserProfileForm');


export default connect(mapStateToProps)(form)