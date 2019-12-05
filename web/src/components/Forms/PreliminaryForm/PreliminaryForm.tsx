import React from 'react';
import { reduxForm,FieldArray, InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { FormattedMessage,injectIntl } from 'react-intl';
import { IPreliminaryForm } from '../../../store/Preliminaries/Types/IPreliminaryState';
import PreliminaryComponentsForm from './PreliminaryComponentsForm';
import IReactIntl from '../../../Translations/IReactIntl';

interface Props {
  onSave: (saveAll:boolean,prelimComponentDetails: any,index:number) => void;
  onToggle:(id:string)=>void;
  preliminariesDetails: any;
}
let PreliminaryForm: React.FC<
  Props &IReactIntl& InjectedFormProps<IPreliminaryForm, Props>
> = (props: any) => {
  const {handleSubmit } = props;
  return (
    <form
            className="preliminary-form"
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
       />
     <div className="mr-35 three-btn">
         <button
          className="active" 
                type="button"
                name="previous"
                onClick={handleSubmit(values => props.onSave(true,values))}
              >
                <FormattedMessage id="BUTTON_PREVIOUS" />
              </button>
              <button
              name="save" className="active ml-auto"
                type="button"
                onClick={handleSubmit(values => props.onSave(true,values))}
              >
                <FormattedMessage id="BUTTON_SAVE" />
              </button>
              <button
                type="button"
                name="next"
                onClick={handleSubmit(values => props.onSave(true,values))}
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
  enableReinitialize: true
})(injectIntl(PreliminaryForm));

export default connect(mapStateToProps)(form);
