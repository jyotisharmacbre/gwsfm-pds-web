import React from 'react';
import { Field, formValueSelector } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import { Validate, alphaNumeric, onlyNumber } from '../../../helpers/fieldValidations';
import { restrictMinus, restrictMinusAndDecimal} from '../../../helpers/utility-helper';
import {calculateSell, calculateTotalCost} from '../../../helpers/formulas';
import { IState } from '../../../store/state';
import { connect } from 'react-redux';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { getPreliminarySummaryCalculation } from '../../../helpers/pricing-calculation-helper';
interface Props {
  fields:any;
      itemDetail:any;
      currencies:Array<ICurrency>|null;
      currencyId:number;
      currencySymbol:string;
      componentIndex:number;
      preliminaryData:Array<IPreliminariesComponentDetails>;
}  

const PreliminaryInsurranceForm:React.FC<Props>
= (props: Props) =>{
 
  const{fields,itemDetail,componentIndex,currencies,currencyId,currencySymbol,preliminaryData}=props;
  const updateCost=(index:number)=>
  {
    props.preliminaryData[props.componentIndex].items[index].totalCost=calculateTotalCost(getPreliminarySummaryCalculation(props.preliminaryData).cost);
  }
  return (
  <tbody>
  {props.fields.map((member, index) => (
   <tr key={index}>
     <td>
       <Field
                        name={`${member}.nameOfSupplier`}
                        data-test="nameOfSupplier"
                        type="text"
                        className="width-120 mb-0"
                        component={PdsFormInput}
                        validate={[
                            Validate.maxLength(1000),
                            alphaNumeric
                          ]}
                      />
    </td>
  <td>
    <Field
                name={`${member}.totalCost`}
                type="number"
                normalize={restrictMinus}
                input={{
                  value:calculateTotalCost(getPreliminarySummaryCalculation(props.preliminaryData).cost),
                    disabled: true,
                    onchange: updateCost(index)
                  
                  }}
                component={PdsFormInput}
                className="width-120 pl-20 required currency"
                validate={[
                    Validate.maxLength(15),
                    onlyNumber
                  
                ]}
                currency={currencySymbol}
                divPosition="relative"
              />
    </td>
    <td>
    <Field
                  name={`${member}.grossMargin`}
                  type="number"
                  normalize={restrictMinusAndDecimal}
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
                     value:calculateSell(props.preliminaryData[props.componentIndex].items[index].totalCost,props.preliminaryData[props.componentIndex].items[index].grossMargin),
                     disabled: true 
                    }}
                   component={PdsFormInput}
                  className="width-120 pl-20 required currency"
                  validate={[
                      Validate.maxLength(15),
                      onlyNumber
                  ]}
                  currency={currencySymbol}
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
                            Validate.maxLength(1000),
                            alphaNumeric
                          ]}
                      />
    </td>

     </tr>
    ))}
    </tbody>
  )};
  const mapStateToProps = (state: IState) => ({
    preliminaryData: selector(state,"preliminaryDetails")
   
  });
 const selector=formValueSelector("PreliminaryForm");
export default connect(mapStateToProps)(PreliminaryInsurranceForm);;

