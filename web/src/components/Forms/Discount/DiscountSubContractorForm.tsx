import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { Validate } from '../../../helpers/fieldValidations';
import { newSubContractorDiscount } from '../../../store/DiscountForm/InitialState';
import ValidatedNumericInput from '../../NumericInput/index';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import { confirmAlert } from '../../Popup/CustomModalPopup';
import { restrictMinusAndAllowDecimal } from '../../../helpers/utility-helper';


interface Props {
    fields: any;
    currencySymbol: string;
    intl: any;
}
const DiscountSubContractorForm: React.FC<Props> = (props: Props) => {
    const { fields, intl } = props;
    console.log(intl);
    return (
        <div>
            {fields.map((member, index) => (
                <div className="row" key={index} data-test="discount-sub-contractor-form">
                    <div className="col-lg-9">
                        <div className="forms_wrap">

                            {fields.length > 1 ? (

                                <button
                                    data-test="deleteDiscountSubContractor"
                                    className="delete_text"
                                    onClick={() =>
                                        confirmAlert({
                                            intl: intl,
                                            titleKey: 'TITLE_CONFIRMATION',
                                            contentKey: 'MESSAGE_DISCOUNT_SUBCONTRACTOR_DELETE_ACTIVITY',
                                            handleConfirm: () => fields.remove(index)
                                        })
                                    }
                                >
                                    <FormattedMessage id="BUTTON_DELETE" />
                                    <FontAwesomeIcon className="" icon={faTrash} />
                                </button>
                            ) : null}
                            <div className="discount-subcontractor-section">
                                <Field
                                    name={`${member}.supplierName`}
                                    type="text"
                                    component={PdsFormInput}
                                    validate={[Validate.maxLength(1000)]}
                                    messageKey="MESSAGE_SUPPLIER_NAME"
                                    labelKey="LABEL_SUPPLIER"
                                    placeholderKey="PLACEHOLDER_ENTER_SUPPLIER_NAME"
                                />
                                <Field
                                    name={`${member}.supplierState`}
                                    type="text"
                                    component={PdsFormInput}
                                    validate={[Validate.maxLength(1000)]}
                                    messageKey="MESSAGE_STATE_DETAILS_NAME"
                                    labelKey="LABEL_STATE_DETAILS"
                                    placeholderKey="PLACEHOLDER_ENTER_STATE_DETAILS"
                                />
                                <Field
                                    name={`${member}.supplierTotalDiscount`}
                                    type="number"
                                    className="width-120 pl-20"
                                    component={PdsFormInput}
                                    validate={[Validate.maxLength(15)]}
                                    messageKey="MESSAGE_TOTAL_DISCOUNT"
                                    labelKey="LABEL_TOTAL_DISCOUNT"
                                    currency={props.currencySymbol}
                                    divPosition="relative"
                                    normalize={restrictMinusAndAllowDecimal}

                                />
                                <Field
                                    name={`${member}.supplierComments`}
                                    rows={7}
                                    type="textarea"
                                    component={PdsFormTextArea}
                                    validate={[Validate.maxLength(5000)]}
                                    labelKey="LABEL_COMMENTS"
                                    placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            ))}
            <div className="newDiscountSubcontractor_btn">
                <button
                    data-test="addSubContractorDiscount"
                    name="addSubContractorDiscount"
                    type="button"
                    hidden={fields.length > 4}
                    className="active"
                    onClick={() => { fields.push({ ...newSubContractorDiscount }); console.log(fields.length); }}
                >
                    <FontAwesomeIcon className="" icon={faPlusCircle} />
                    <FormattedMessage id="BUTTON_NEW_SUBCONTRACTOR_DISCOUNT" />
                </button>
            </div>
        </div>
    );
};

export default DiscountSubContractorForm;


