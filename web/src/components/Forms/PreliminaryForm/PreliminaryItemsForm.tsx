import React, { Suspense } from 'react';
import { Field, formValueSelector } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import { Validate, alphaNumeric, onlyNumber } from '../../../helpers/fieldValidations';
import { restrictMinus} from '../../../helpers/utility-helper';
import { calculateCost,calculateSell} from '../../../helpers/formulas';
import { IState } from '../../../store/state';
import { connect } from 'react-redux';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
interface Props {
  fields:any;
      itemDetail:any;
      currencies:Array<ICurrency>|null;
      currencyId:number;
      currencySymbol:string;
      componentIndex:number;
      preliminaryData:Array<IPreliminariesComponentDetails>;
}  

const PreliminaryItemsForm:React.FC<Props>
= (props: Props) =>{
  const updateCost=(index:number)=>
  {
    props.preliminaryData[props.componentIndex].items[index].totalCost=(props.preliminaryData[props.componentIndex].items[index].noOfHours*props.preliminaryData[props.componentIndex].items[index].hourRate);
  }
  const{fields,itemDetail,componentIndex,currencies,currencyId,currencySymbol,preliminaryData}=props;

  return (
    
  <tbody>
    <Suspense fallback={<div>Loading...</div>}>
  {props.fields.map((member, index) => (
    
   <tr key={index}>
     
     <td>{props.itemDetail.items[index].itemName}</td>
     <td>
                       <Field
                        name={`${member}.nameOfSupplier`}
                        input={(props.itemDetail.items[index].itemId=="2"||props.itemDetail.items[index].itemId=="3")?{disabled: true}:{disabled: false} }
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
                  name={`${member}.noOfHours`}
                  type="number"
                 input={(props.itemDetail.items[index].itemId=="1"||props.itemDetail.items[index].itemId=="2")?{ disabled: true}:{ disabled: false}}
                 component={PdsFormInput}
                  className="width-120 pl-20 required "
                  validate={[
                      Validate.maxLength(15),
                      onlyNumber
                    
                  ]}
                  normalize={restrictMinus}
                  divPosition="relative"
                />
    </td>
      <td>
                <Field
                  name={`${member}.hourRate`}
                  type="number"
                  normalize={restrictMinus}                 
                  input={(props.itemDetail.items[index].itemId=="1"||props.itemDetail.items[index].itemId=="2")?{ disabled: true}:{disabled: false}}
                  component={PdsFormInput}
                  className="width-120 pl-20 required currency"
                  validate={[
                      Validate.maxLength(15),
                      onlyNumber
                  ]}
                  currency={currencySymbol}
                  divPosition="relative"
                  placeholderKey=""
                />
    </td>
  <td>
<Field
                name={`${member}.totalCost`}
                type="number"
                normalize={restrictMinus}
                input={(props.itemDetail.items[index].itemId!="3"&&props.itemDetail.items[index].itemId!="4")?{
                    disabled: false
                   
                } : {
                    value: calculateCost(props.preliminaryData[props.componentIndex].items[index].noOfHours, props.preliminaryData[props.componentIndex].items[index].hourRate),
                        disabled: true,
                        onchange: updateCost(index)}}
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
                  normalize={restrictMinus}
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
     </Suspense>
    </tbody>
  )};
  const mapStateToProps = (state: IState) => ({
    preliminaryData: selector(state,"preliminaryDetails")
  });
 const selector=formValueSelector("PreliminaryForm");
export default connect(mapStateToProps)(PreliminaryItemsForm);;

