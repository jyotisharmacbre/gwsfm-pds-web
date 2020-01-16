import React from 'react';
import { reduxForm,FieldArray, InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { FormattedMessage,injectIntl } from 'react-intl';
import { IPreliminaryForm } from '../../../store/Preliminaries/Types/IPreliminaryState';
import PreliminaryComponentsForm from './PreliminaryComponentsForm';
import IReactIntl from '../../../Translations/IReactIntl';
import EventType from '../../../enums/EventType';

interface Props {
  onSave: (saveAll:boolean,event:EventType,prelimComponentDetails: any,index:number) => void;
  onPrevious:()=>void;
  onToggle:(id:string)=>void;
  preliminariesDetails: any;
  currencySymbol:string;
  isExpand: boolean;
  componentIdList:Array<string>;
}
let PreliminaryForm: React.FC<
  Props &IReactIntl& InjectedFormProps<IPreliminaryForm, Props>
> = (props: any) => {
  const {handleSubmit} = props;
  return (
    <form
            className="preliminary-form"
            data-test="preliminary-form"
            onSubmit={handleSubmit}
            noValidate={true}
          >
             <FieldArray 
      name="preliminaryDetails" 
      component={PreliminaryComponentsForm}
      submitHandler={props.onSave}
      onToggleEvent={props.onToggle}
      prelimData={props.preliminariesDetails}
      handleSubmit={handleSubmit}
      currencySymbol={props.currencySymbol}
      isExpand= {props.isExpand}
      componentIdList={props.componentIdList}
       />
     <div className="mr-35 three-btn">
         <button
          className="active" 
          data-test="previous"
                type="button"
                name="previous"
                onClick={handleSubmit(values => props.onPrevious())}
              >
                <FormattedMessage id="BUTTON_PREVIOUS" />
              </button>
              <button
              name="save" className="active ml-auto" data-test="save"
                type="button"
                onClick={handleSubmit(values => props.onSave(true,EventType.none,values))}
              >
                <FormattedMessage id="BUTTON_SAVE" />
              </button>
              <button
                type="button"
                name="next"
                data-test="next"
                onClick={handleSubmit(values => props.onSave(true,EventType.next,values))}
              >
                <FormattedMessage id="BUTTON_NEXT" />
              </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.preliminary,
});

const form = reduxForm<IPreliminaryForm, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'PreliminaryForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize :true
})(injectIntl(PreliminaryForm));

export default connect(mapStateToProps)(form);
