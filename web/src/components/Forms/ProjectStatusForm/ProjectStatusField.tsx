import React, { useEffect } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import { IState } from '../../../store/state';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import * as actions from '../../../store/rootActions';

import {
  projectStatusData,
  engagementData
} from '../../../helpers/dropDownFormValues';
import { FormattedMessage, injectIntl } from 'react-intl';
import IReactIntl from '../../../Translations/IReactIntl';
import { getDropdown } from '../../../helpers/utility-helper';
import { ILookup } from '../../../store/Lookups/Types/ILookup';
interface Props { 
  projectstatus: any  
  }


  interface formState {
    projectStatusTest:number;
  }

let ProjectStatusField: React.FC<
  Props & InjectedFormProps<formState, Props>
> = (props: any) => {

    const { handleSubmit } = props;

    function handleStatus(value: any) {
     // props.handleOtherFieldChange(value);
    }   

  const normalize = value => (value ? parseInt(value) : null);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-sm-12">
          <form
            className="project-overview-form"
            noValidate={true}
            onSubmit={handleSubmit}
          >
               <div className={'form-group'}>
                  <div className="select-wrapper">
                    <Field
                      name="projectStatusTest"
                      component={PdsFormSelect}
                      placeholderKey=""
                      messageKey=""
                      normalize ={normalize}
                      onChange={handleStatus}
                    >
                      <FormattedMessage id="PLACEHOLDER_BUDGET">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(props.projectstatus, LookupType.Project_Status)}
                    </Field>
                  </div>
                </div>
                </form>
        </div>
      </div>
    </div>
  );
};

  const form = reduxForm<formState, Props>({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: false,
    form: 'ProjectStatusField',
    enableReinitialize: true
  })(ProjectStatusField);

export default connect(null, null)(form);