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

interface IProps {
    fields: any;
    currencySymbol: string;
    intl: any;
}

const Quote: React.FC<IProps> = props => {
    const deleteQuote = (index) => {
        debugger;
        props.fields.remove(index);
    }
    return (
        <div className="row" data-test="sub-contractor-quote-form">
            <div className="col-lg-12">
                <div className="card_outer_wrap quote_wrap">
                    <div className="row">
                        {props.fields.map((member, index) => (
                            <div key={index} className="col-lg-4 pl-md-2 pr-md-2 mb-2 mt-2" data-test="sub-contractor-quote-member">
                                <div className="card_wrap">
                                    <div className="card">
                                        <h6 className="title"><FormattedMessage id='TITLE_QUOTE'></FormattedMessage> {index + 1}</h6>
                                        {props.fields.length > 3 ? (
                                            <button
                                                data-test="deletequote"
                                                className="delete_text"
                                                onClick={() =>
                                                    confirmAlert({
                                                        intl: props.intl,
                                                        titleKey: 'TITLE_CONFIRMATION',
                                                        contentKey: 'MESSAGE_SUBCONTRACTOR_DELETE_QUOTE',
                                                        handleConfirm: () => deleteQuote(index) 
                                                    })}
                                            >
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
                                            currency={props.currencySymbol}
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
                                    props.fields.length > 19 ?
                                        confirmAlert({
                                            intl: props.intl,
                                            contentKey: 'MESSAGE_SUBCONTRACTOR_ADD_MAX_QUOTE',
                                            showFooter: false
                                        })
                                        :
                                        props.fields.push({ ...newQuote });
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
        )
}

export default Quote; 
