import React from 'react';
import { Field, reduxForm, InjectedFormProps, FormSection } from 'redux-form';
import IReactIntl from '../../../Translations/IReactIntl';
import { IQuote } from '../../../store/SubContractor/Types/IQuote';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import PdsFormTypeAhead from '../../PdsFormHandlers/PdsFormTypeAhead';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Validate, alphaNumeric, onlyNumber } from '../../../helpers/fieldValidations';
import ValidatedNumericInput from '../../NumericInput';
import { restrictMinus, restrictMinusAndAllowDecimal } from '../../../helpers/utility-helper';
import { newQuote } from '../../../store/SubContractor/InitialState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from '../../Popup/CustomModalPopup';

const Quote = ({ fields, currencySymbol, intl }) => (
    <div className="row" data-test="sub-contractor-quote-form">
        <div className="col-lg-12">
            <div className="card_outer_wrap quote_wrap">
                <div className="row">
                    {fields.map((member, index) => (
                        <div key={index} className="col-lg-4 pl-md-2" data-test="sub-contractor-quote-member">
                            <div className="card_wrap">
                                <div className="card">
                                    <h6 className="title"><FormattedMessage id='TITLE_QUOTE'></FormattedMessage> {index + 1}</h6>
                                    {fields.length > 3 ? (
                                        <button
                                            data-test="deletequote"
                                            className="delete_text"
                                            onClick={() =>
                                                confirmAlert({
                                                    intl: intl,
                                                    titleKey: 'TITLE_CONFIRMATION',
                                                    contentKey: 'MESSAGE_SUBCONTRACTOR_DELETE_QUOTE',
                                                    handleConfirm: () => fields.remove(index)
                                                })}
                                        >
                                            <span className="d-none d-lg-inline"><FormattedMessage id="BUTTON_DELETE" /></span>
                                            <FontAwesomeIcon className="" icon={faTrash} />
                                        </button>
                                    ) : null}
                                    <Field
                                        name={`${member}.supplierName`}
                                        data-test="supplierName"
                                        type="text"
                                        component={PdsFormInput}
                                        validate={[
                                            Validate.maxLength(1000)
                                        ]}
                                        labelKey="LABEL_ACTIVITY_NAME"
                                        placeholderKey="PLACEHOLDER_SUPPLIER_NAME"
                                    />
                                    <Field
                                        name={`${member}.quoteValue`}
                                        type="text"
                                        component={PdsFormInput}
                                        className="pl-20"
                                        validate={[
                                            Validate.maxLength(1000),
                                            onlyNumber
                                        ]}
                                        currency={currencySymbol}
                                        divPosition="relative"
                                        labelKey="LABEL_QUOTE_VALUE"
                                        placeholderKey=""
                                        normalize={restrictMinusAndAllowDecimal}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="newActiv_btn">
                        <button
                            data-test="addQuote"
                            name="addQuote"
                            type="button"
                            className="active"
                            onClick={() => {
                                fields.length > 19 ? 
                                    confirmAlert({
                                        intl: intl,
                                        contentKey: 'MESSAGE_SUBCONTRACTOR_ADD_MAX_QUOTE',
                                        showFooter: false
                                    })
                                :
                                fields.push({ ...newQuote });
                            }}
                        >
                            <FontAwesomeIcon className="" icon={faPlusCircle} />
                            <FormattedMessage id="BUTTON_NEW_QUOTE" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Quote; 
