import React from 'react';
import { FieldArray} from 'redux-form';
import { FormattedMessage } from 'react-intl';
import PreliminaryItemsForm from './PreliminaryItemsForm';
import EventType from '../../../enums/EventType';

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
      
}  

const PreliminaryComponentsForm = ({ fields,submitHandler,handleSubmit,onToggleEvent,prelimData}) => (

  <div>
  {fields.map((member, index) => (
    <div className="accordion" key={index}>
          <div className="card">
            <div
              className="card-header"
              data-toggle="collapse"
              data-test="collapse"
              onClick={()=>onToggleEvent(prelimData[index].componentId)}
            >
              <a className="card-link" >{prelimData[index].componentName}</a>
             
              <span className="fas fa-angle-up" aria-hidden="true"></span>
            </div>
            <div
               id={"collapse_"+prelimData[index].componentId}
              className="hide expandAll"
              data-test="toggle"
              data-parent="#accordion"
            > <form
            className="preliminary-form-1"
            onSubmit={handleSubmit}
            noValidate={true}
          >
                <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th><FormattedMessage id="ITEM" /></th>
                    <th><FormattedMessage id="NAME_OF_SUPPLIER" /></th>
                    <th><FormattedMessage id="NO_OF_HOURS" /></th>
                    <th><FormattedMessage id="HOUR_RATE" /></th>
                    <th><FormattedMessage id="TOTAL_COST" /></th>
                    <th><FormattedMessage id="GROSS_MARGIN" /></th>
                    <th><FormattedMessage id="TOTAL_SELL" /></th>
                    <th><FormattedMessage id="COMMENTS" /></th>
                  </tr>
                </thead>
                
                <FieldArray 
              name={`${member}.items`} 
              component={PreliminaryItemsForm}
              itemDetail={prelimData[index]}
              componentIndex={index}
              currencies={[]}
              currencyId={0}
              currencySymbol={"$"}
              key={index}
            />
           
            </table>
                </div>
                </div>
                </form>
        <div className="text-right" >
                  <button type="button" data-test="componentSave" className="text-right btn-sm" onClick={handleSubmit(values=>submitHandler(false,EventType.none,values,index))} >
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

