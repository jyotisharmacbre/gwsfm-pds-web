import React from 'react';
import { Field } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import { Validate, alphaNumeric, onlyNumber } from '../../../helpers/fieldValidations';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
interface Props {
      itemDetail:any;
}  

const PreliminaryItemsForm = ({ fields,itemDetail}) => (
  <tbody>
  {fields.map((member, index) => (
   <tr>
     <td>{itemDetail.items[index].itemName}</td>
     <td>
                       <Field
                        name={`${member}.nameOfSupplier`}
                        data-test="nameOfSupplier"
                        type="text"
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
                  component={PdsFormInput}
                  className="width-120 pl-20 required"
                  validate={[
                    Validate.maxLength(15),
                    onlyNumber
                  ]}
                  divPosition="relative"
                />
    </td>
     <td>
                <Field
                  name={`${member}.hourRate`}
                  type="number"
                  component={PdsFormInput}
                  className="width-120 pl-20 required"
                  validate={[
                    Validate.maxLength(15),
                    onlyNumber
                  ]}
                  currency="$"
                  divPosition="relative"
                  placeholderKey=""
                />
    </td>
  <td>
    <Field
                  name={`${member}.totalCost`}
                  type="number"
                  component={PdsFormInput}
                  className="width-120 pl-20 required"
                  validate={[
                    Validate.maxLength(15),
                    onlyNumber
                  ]}
                  currency="$"
                  divPosition="relative"
                />
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
                  currency="%"
                  divPosition="relative"
                />
    </td>
    <td>
    <Field
                  name={'totalSell'}
                  type="number"
                  component={PdsFormInput}
                  className="width-120 pl-20 required"
                  validate={[
                    Validate.maxLength(15),
                    onlyNumber
                  ]}
                  currency="$"
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
  );

 
export default PreliminaryItemsForm;

