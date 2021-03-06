import React from 'react';
import { Field, formValueSelector } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import { Validate, onlyNumber, isLumpSumOrCBRELabourExists, isLumpSumOrSubContractorExists, isCBRELabourOrAgencyLabourExists,allowWhitelist }
    from '../../../helpers/fieldValidations';
import { restrictMinus, restrictMinusAndAllowDecimal, restrictMinusAndAllowDecimalForMaxRangeHundred } from '../../../helpers/utility-helper';
import { calculateCost, calculateSell } from '../../../helpers/formulas';
import { IState } from '../../../store/state';
import { connect } from 'react-redux';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
interface Props {
    fields: any;
    itemDetail: any;
    currencies: Array<ICurrency> | null;
    currencyId: number;
    currencySymbol: string;
    componentIndex: number;
    preliminaryData: Array<IPreliminariesComponentDetails>;
}

const PreliminaryItemsForm: React.FC<Props>
    = (props: Props) => {
    /* istanbul ignore next */
        const updateCost = (index: number) => {
            props.preliminaryData[props.componentIndex].items[index].totalCost = (props.preliminaryData[props.componentIndex].items[index].noOfHours * props.preliminaryData[props.componentIndex].items[index].hourRate);
        }
        return (
            <tbody>
                {props.fields.map((member, index) => (
                    <tr key={index}>
                        <td>{props.itemDetail.items[index].itemName}</td>
                        <td>
                            {isLumpSumOrCBRELabourExists(props.itemDetail.items[index].itemId) ? <Field
                                name={`${member}.nameOfSupplier`}
                                input={{ disabled: true }}
                                data-test="nameOfSupplier"
                                type="text"
                                className="width-120 mb-0"
                                component={PdsFormInput}
                                validate={[
                                    Validate.maxLength(1000),allowWhitelist
                                ]}
                            /> : <Field
                                    name={`${member}.nameOfSupplier`}
                                    data-test="nameOfSupplier"
                                    type="text"
                                    component={PdsFormInput}
                                    validate={[
                                        Validate.maxLength(1000),allowWhitelist
                                    ]}
                                />}
                        </td>
                        <td>
                            {(isLumpSumOrSubContractorExists(props.itemDetail.items[index].itemId)) ? <Field
                                name={`${member}.noOfHours`}
                                type="text"
                                input={{ disabled: true }}
                                component={PdsFormInput}
                                className="width-120 pl-20 required "
                                validate={[
                                    Validate.maxLength(15),
                                    onlyNumber
                                ]}
                                normalize={restrictMinus}
                                divPosition="relative"
                            /> : <Field
                                    name={`${member}.noOfHours`}
                                    type="text"
                                    component={PdsFormInput}
                                    className="width-120 pl-20 required "
                                    validate={[
                                        Validate.maxLength(15),
                                        onlyNumber
                                    ]}
                                    normalize={restrictMinus}
                                    divPosition="relative"
                                />}
                        </td>
                        <td>
                            {(isLumpSumOrSubContractorExists(props.itemDetail.items[index].itemId)) ? <Field
                                name={`${member}.hourRate`}
                                type="text"
                                normalize={restrictMinus}
                                input={{ disabled: true }}
                                component={PdsFormInput}
                                className="width-120 pl-20 required currency"
                                validate={[
                                    Validate.maxLength(15),
                                    onlyNumber
                                ]}
                                currency={props.currencySymbol}
                                divPosition="relative"
                                placeholderKey=""
                            /> : <Field
                                    name={`${member}.hourRate`}
                                    type="text"
                                    component={PdsFormInput}
                                    normalize={restrictMinus}
                                    className="width-120 pl-20 required currency"
                                    validate={[
                                        Validate.maxLength(15),
                                        onlyNumber
                                    ]}
                                    currency={props.currencySymbol}
                                    divPosition="relative"
                                    placeholderKey=""
                                />}
                        </td>
                        <td>
                            {isCBRELabourOrAgencyLabourExists(props.itemDetail.items[index].itemId) ? <Field
                                name={`${member}.totalCost`}
                                type="text"
                                component={PdsFormInput}
                                normalize={restrictMinusAndAllowDecimal}
                                className="width-120 pl-20 required currency"
                                validate={[
                                    Validate.maxLength(15),
                                    onlyNumber
                                ]}
                                currency={props.currencySymbol}
                                divPosition="relative"
                            /> : <Field
                                    name={`${member}.totalCost`}
                                    type="text"
                                    normalize={restrictMinusAndAllowDecimal}
                                    input={{
                                        value: calculateCost(props.preliminaryData[props.componentIndex].items[index].noOfHours, props.preliminaryData[props.componentIndex].items[index].hourRate),
                                        disabled: true,
                                        onchange: updateCost(index)
                                    }}
                                    component={PdsFormInput}
                                    className="width-120 pl-20 required currency"
                                    validate={[
                                        Validate.maxLength(15),
                                        onlyNumber
                                    ]}
                                    currency={props.currencySymbol}
                                    divPosition="relative"
                                />}
                        </td>
                        <td>
                            <Field
                                name={`${member}.grossMargin`}
                                type="text"
                                normalize={restrictMinusAndAllowDecimalForMaxRangeHundred}
                                component={PdsFormInput}
                                className="width-120 pl-20 required currency"
                                validate={[
                                    Validate.maxLength(15),
                                    onlyNumber
                                ]}
                                currency={"%"}
                                divPosition="relative"
                            />
                        </td>
                        <td>
                            <Field
                                name={'totalSell'}
                                type="text"
                                input={{
                                    value: calculateSell(props.preliminaryData[props.componentIndex].items[index].totalCost, props.preliminaryData[props.componentIndex].items[index].grossMargin),
                                    disabled: true
                                }}
                                component={PdsFormInput}
                                className="width-120 pl-20 required currency"
                                validate={[
                                    Validate.maxLength(15),
                                    onlyNumber
                                ]}
                                currency={props.currencySymbol}
                                divPosition="relative"
                            />
                        </td>
                        <td>
                            <Field
                                name={`${member}.comments`}
                                data-test="comments"
                                type="text"
                                component={PdsFormInput}
                                validate={[
                                    Validate.maxLength(1000),allowWhitelist
                                ]}
                            />
                        </td>

                    </tr>
                ))}
            </tbody>
        )
    };
const mapStateToProps = (state: IState) => ({
    preliminaryData: selector(state, "preliminaryDetails"),
    currencies: state.lookup.currencies,
    currencyId: state.project.form.currencyId
});
const selector = formValueSelector("PreliminaryForm");
export default connect(mapStateToProps)(PreliminaryItemsForm);