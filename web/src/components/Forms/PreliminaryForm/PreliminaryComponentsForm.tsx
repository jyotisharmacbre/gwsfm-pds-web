import React from 'react';
import { FieldArray} from 'redux-form';
import { FormattedMessage } from 'react-intl';
import PreliminaryItemsForm from './PreliminaryItemsForm';
import EventType from '../../../enums/EventType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faCheck } from '@fortawesome/free-solid-svg-icons';

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

const PreliminaryComponentsForm = ({ fields,submitHandler,handleSubmit,onToggleEvent,prelimData,currencySymbol, isExpand}) => (

  <div>
  {fields.map((member, index) => (
    <div className="accordion" key={index}>
          <div className="card">
            <div
              className="card-header p-l-43"
              data-toggle="collapse"
              data-test="collapse"
              onClick={()=>onToggleEvent(prelimData[index].componentId)}
            >
              <div className="tick_wrap">
              <FontAwesomeIcon icon={faCheck} />
              </div>
              <a className="card-link" >{prelimData[index].componentName}</a>
             
              <span aria-hidden="true">
              <FontAwesomeIcon className="active" icon={faAngleUp} />
              </span>
            </div>
            <div
               id={"collapse_"+prelimData[index].componentId}
              className={`${isExpand? 'show': 'hide'} expandAll`}
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
                    <th><FormattedMessage id="T_HEADING_ITEM" /></th>
                    <th><FormattedMessage id="T_HEADING_NAME_OF_SUPPLIER" /></th>
                    <th><FormattedMessage id="T_HEADING_NO_OF_HOURS" /></th>
                    <th><FormattedMessage id="T_HEADING_HOUR_RATE" /></th>
                    <th><FormattedMessage id="T_HEADING_TOTAL_COST" /></th>
                    <th><FormattedMessage id="T_HEADING_GROSS_MARGIN" /></th>
                    <th><FormattedMessage id="T_HEADING_TOTAL_SELL" /></th>
                    <th><FormattedMessage id="T_HEADING_COMMENTS" /></th>
                  </tr>
                </thead>
                
                <FieldArray 
              name={`${member}.items`} 
              component={PreliminaryItemsForm}
              itemDetail={prelimData[index]}
              componentIndex={index}
              currencies={[]}
              currencyId={0}
              currencySymbol={currencySymbol}
              key={index}
            />
           
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
  
    ))}
    </div>
  );
 
export default PreliminaryComponentsForm;

