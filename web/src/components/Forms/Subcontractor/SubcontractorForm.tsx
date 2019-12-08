import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import DiscountTable from '../../Table/DiscountTable';
import SubContractorActivityForm from './SubContractorActivityForm';
import IReactIntl from '../../../Translations/IReactIntl';
import { ISubContractor } from '../../../store/SubContractor/Types/ISubContractor';
import { IState } from '../../../store/state';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
  onNext: (data: ISubContractor) => void;
  onPrevious: (data: ISubContractor) => void;
  onSave: (data: ISubContractor) => void;
  addNewActivity: () => void;
  deleteActivity: (index:number) => void;
}

let SubcontractorForm: React.FC<
  Props & IReactIntl & InjectedFormProps<ISubContractor, Props>
> = (props: any) => {

  return (
    <form className="subcontractor_form">
      <DiscountTable></DiscountTable>
      {props.initialValues.activities && 
      props.initialValues.activities.map((data,index)=>{
        return (
          <SubContractorActivityForm 
          key={`subContractorActivityForm${index}`}
          index={index}
          form={`subContractorActivityForm${index}`}
          initialValues={data}
          totalCount={props.initialValues.activities.length}
          deleteActivity={props.deleteActivity}
          />
        )
      })}
      <div className="newActiv_btn">
          <button type="button" disabled={props.initialValues.activities.length>4} className="active" onClick={props.addNewActivity}>
            <FontAwesomeIcon className="" icon={faPlusCircle} />
            <FormattedMessage id="BUTTON_NEW_ACTIVITY" />
          </button>
        </div>
      <div className="mr-35 three-btn">
          <button className="active" type="button">
          <FormattedMessage id="BUTTON_PREVIOUS" />
          </button>
          <button type="button" name="next" className="active ml-auto">
          <FormattedMessage id="BUTTON_SAVE" />
          </button>
          <button type="button" name="next" className="">
          <FormattedMessage id="BUTTON_NEXT" />
          </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.subContractor.form
});

const form = reduxForm<ISubContractor, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'subContractorForm',
  enableReinitialize: true
})(injectIntl(SubcontractorForm));

export default connect(mapStateToProps)(form);
