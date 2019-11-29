import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import DiscountTable from '../../Table/DiscountTable';
import SubContractorActivityForm from './SubContractorActivityForm';
import IReactIntl from '../../../Translations/IReactIntl';
import { ISubContractor } from '../../../store/SubContractor/Types/ISubContractor';
import { IState } from '../../../store/state';

interface Props {
  onNext: (data: ISubContractor) => void;
  onPrevious: (data: ISubContractor) => void;
  onSave: (data: ISubContractor) => void;
}

let SubcontractorForm: React.FC<
  Props & IReactIntl & InjectedFormProps<ISubContractor, Props>
> = (props: any) => {
  return (
    <form className="subcontractor_form">
      <DiscountTable></DiscountTable>
      <SubContractorActivityForm 
        initialValues={props.initialValues.activities[0]}
      />
      <div className="newActiv_btn">
        <button>New Activity</button>
      </div>
      <div className="hr_line"></div>
      <div className="mr-35 d-flex justify-content-between mb-4">
        <button className="active mb-4 mt-5" type="button">
          PREVIOUS
        </button>
        <button type="button" name="next" className="mb-4 mt-5 text-right mr-0">
          SAVE
        </button>
        <button type="button" name="next" className="mb-4 mt-5 text-right mr-0">
          NEXT
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
