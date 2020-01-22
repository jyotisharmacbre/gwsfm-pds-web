import React, { Suspense, useState } from 'react';
import { FieldArray} from 'redux-form';
import { FormattedMessage } from 'react-intl';
import PreliminaryItemsForm from './PreliminaryItemsForm';
import EventType from '../../../enums/EventType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import PreliminaryInsurranceForm from './PreliminaryInsurranceForm';
import { CheckConstraints } from '../../../helpers/fieldValidations';
import { getClassNameForProjectStatus } from '../../../helpers/utility-helper';

interface Props {
  submitHandler: (
        saveAll:boolean,
        event:EventType,
        prelimComponentDetails: any,
        index:number
      ) => void;
      onToggleEvent: (
        id: string
      ) => void;
      prelimData:any;
      handleSubmit:any;
      currencySymbol:string;
      
}  
const PreliminaryComponentsForm = ({ fields,submitHandler,handleSubmit,onToggleEvent,prelimData,currencySymbol, isExpand,componentIdList, projectStatus}) => (

  <div>
  {fields.map((member, index) => {

    const classNameUsingStatus = getClassNameForProjectStatus(projectStatus);
    const isSaved = prelimData[index].items.find(x=>x.preliminaryId);
    const isFreezedAndExpand = (classNameUsingStatus =='link_disabled' && isSaved) && onToggleEvent(prelimData[index].componentId);

    return (
    <div className="accordion" key={index}>
          <div className="card">
            <div
              className="card-header p-l-43"
              data-toggle="collapse"
              data-test="tickWrap"
              onClick={()=>onToggleEvent(prelimData[index].componentId)}
            >
               {isSaved? <div className="tick_wrap">
              <FontAwesomeIcon icon={faCheck} />
              </div> : "" }
             
              <a className="card-link" >{prelimData[index].componentName}</a>
             
              <span aria-hidden="true">
              <FontAwesomeIcon data-test="collapse" className="active" icon={faAngleUp}/>
              </span>
            </div>
            <div
               id={"collapse_"+prelimData[index].componentId}
              className={CheckConstraints(prelimData[index].componentId)||isExpand||isFreezedAndExpand?"show expandAll":"hide expandAll"}
              data-test="toggle"
              data-parent="#accordion"
            > <form
            className="preliminary-form-1"
            onSubmit={handleSubmit}
            noValidate={true}
          >
                <div className="card-body pt-0">
            <div className="table-responsive price-sumry mt-0">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {!CheckConstraints(prelimData[index].componentId)?<th><FormattedMessage id="T_HEADING_ITEM" /></th>:null}
                    <th><FormattedMessage id="T_HEADING_NAME_OF_SUPPLIER" /></th>
                    {!CheckConstraints(prelimData[index].componentId)?<th><FormattedMessage id="T_HEADING_NO_OF_HOURS" /></th>:null}
                    {!CheckConstraints(prelimData[index].componentId)?<th><FormattedMessage id="T_HEADING_HOUR_RATE" /></th>:null}
                    <th><FormattedMessage id="T_HEADING_TOTAL_COST" /></th>
                    <th><FormattedMessage id="T_HEADING_GROSS_MARGIN" /></th>
                    <th><FormattedMessage id="T_HEADING_TOTAL_SELL" /></th>
                    <th><FormattedMessage id="T_HEADING_COMMENTS" /></th>
                  </tr>
                </thead>
                <Suspense fallback={<div>Loading...</div>}>
                 {((!CheckConstraints(prelimData[index].componentId)&&componentIdList.includes(prelimData[index].componentId))||(isExpand&&!CheckConstraints(prelimData[index].componentId)))?<FieldArray 
              name={`${member}.items`} 
              component={PreliminaryItemsForm}
              itemDetail={prelimData[index]}
              componentIndex={index}
              currencies={[]}
              currencyId={0}
              currencySymbol={currencySymbol}
              key={index}
            />:null}
            {CheckConstraints(prelimData[index].componentId)?<FieldArray 
            name={`${member}.items`} 
            component={PreliminaryInsurranceForm}
            itemDetail={prelimData[index]}
            componentIndex={index}
            currencies={[]}
            currencyId={0}
            currencySymbol={currencySymbol}
            key={index}/>:null} 
           
           </Suspense>
            </table>
                </div>
                </div>
                </form>
        <div className="text-right preliminary_btn" >
                  <button type="button" data-test="componentSave" className="text-center btn-sm" onClick={handleSubmit(values=>submitHandler(false,EventType.none,values,index))} >
                  <FormattedMessage id="BUTTON_SAVE" />
                  </button>
                </div>
             
            </div>
          </div>
     
           
        </div>
  
    )})}
    </div>
  );
 
export default PreliminaryComponentsForm;

