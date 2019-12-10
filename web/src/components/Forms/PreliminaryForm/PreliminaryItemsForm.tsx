import React from 'react';
import { Field, formValueSelector } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import { Validate, alphaNumeric, onlyNumber } from '../../../helpers/fieldValidations';
import { getFilterElementFromArray,calculateCost,calculateSell} from '../../../helpers/utility-helper';
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
  const currencySymbols:string=getFilterElementFromArray(props.currencies,"currencyId",props.currencyId,"currencySymbol");

  return (
  <tbody>
  {props.fields.map((member, index) => (
   <tr>
     <td>{props.itemDetail.items[index].itemName}</td>
     <td>
                       {props.itemDetail.items[index].itemId=="2"||props.itemDetail.items[index].itemId=="3"?<Field
                        name={`${member}.nameOfSupplier`}
                        input={{disabled: true} }
                        data-test="nameOfSupplier"
                        type="text"
                        component={PdsFormInput}
                        validate={[
                            Validate.maxLength(1000),
                            alphaNumeric
                          ]}
                      />:<Field
                      name={`${member}.nameOfSupplier`}
                      data-test="nameOfSupplier"
                      type="text"
                      component={PdsFormInput}
                      validate={[
                          Validate.maxLength(1000),
                          alphaNumeric
                        ]}
                    />}
    </td>
    <td>
    {(props.itemDetail.items[index].itemId=="1"||props.itemDetail.items[index].itemId=="2")?<Field
                  name={`${member}.noOfHours`}
                  type="number"
                 input={{ disabled: true}}
                  component={PdsFormInput}
                  className="width-120 pl-20 required "
                  validate={[
                    Validate.maxLength(15),
                    onlyNumber
                  ]}
                  divPosition="relative"
                />:<Field
                name={`${member}.noOfHours`}
                type="number"
                component={PdsFormInput}
                className="width-120 pl-20 required "
                validate={[
                  Validate.maxLength(15),
                  onlyNumber
                ]}
                divPosition="relative"
              />}
    </td>
     <td>
                {(props.itemDetail.items[index].itemId=="1"||props.itemDetail.items[index].itemId=="2")?<Field
                  name={`${member}.hourRate`}
                  type="number"
                 input={{ disabled: true}}
                  component={PdsFormInput}
                  className="width-120 pl-20 required "
                  validate={[
                    Validate.maxLength(15),
                    onlyNumber
                  ]}
                  currency={currencySymbols}
                  divPosition="relative"
                  placeholderKey=""
                />:<Field
                name={`${member}.hourRate`}
                type="number"
                component={PdsFormInput}
                className="width-120 pl-20 required "
                validate={[
                  Validate.maxLength(15),
                  onlyNumber
                ]}
                currency={currencySymbols}
                divPosition="relative"
                placeholderKey=""
              />}
    </td>
  <td>
    {props.itemDetail.items[index].itemId!="3"&&props.itemDetail.items[index].itemId!="4"?<Field
                  name={`${member}.totalCost`}
                  type="number"
                  component={PdsFormInput}
                  className="width-120 pl-20 required"
                  validate={[
                    Validate.maxLength(15),
                    onlyNumber
                  ]}
                  currency={currencySymbols}
                  divPosition="relative"
                />:<Field
                name={`${member}.totalCost`}
                type="number"
                input={{
                  value:calculateCost(props.preliminaryData[props.componentIndex].items[index].noOfHours,props.preliminaryData[props.componentIndex].items[index].hourRate),
                  disabled: true,
                  onchange:updateCost(index)
                  }}
                component={PdsFormInput}
                className="width-120 pl-20 required"
                validate={[
                  Validate.maxLength(15),
                  onlyNumber
                ]}
                currency={currencySymbols}
                divPosition="relative"
              />}
    </td>
    <td>
    <Field
                  name={`${member}.grossMargin`}
                  type="number"
                  component={PdsFormInput}
                  className="width-120 pl-20 required"
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
                  className="width-120 pl-20 required"
                  validate={[
                    Validate.maxLength(15),
                    onlyNumber
                  ]}
                  currency={currencySymbols}
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
    preliminaryData: selector(state,"preliminaryDetails"),
    currencies:state.lookup.currencies,
    currencyId:state.project.form.currencyId
  });
 const selector=formValueSelector("PreliminaryForm");
export default connect(mapStateToProps)(PreliminaryItemsForm);;

