import React, { Props } from 'react';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import { Field, reduxForm } from 'redux-form';
import { Validate } from '../../../helpers/fieldValidations';

const SetupForm = () => {
    return (
        <div className="mt-10">
            <div className="setup_form_outer">
                <div className="row">
                    <div className="col-lg-2 col-sm-6 pr-lg-0">
                        <div className="name_outer">
                            <h3>Client Name</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 pr-lg-0 pdgl-20">
                        <div className="field_outer">
                            <Field
                                name="projectAdditionalDetail.insurance"
                                data-test="insurance"
                                type="text"
                                component={PdsFormInput}
                                className="required"
                                validate={[Validate.required('LABEL_INSURANCE'), Validate.maxLength(1000)]}
                                labelKey="LABEL_INSURANCE"
                                placeholderKey="PLACEHOLDER_ADD_INSURANCE"
                            />
                            {/* <div className="form-group">
                            <input placeholder="Name surname" type="text" className="form-control" value="" />
                        </div> */}
                            <div className="form-group">
                                <input placeholder="Email" type="Email" className="form-control" value="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 pr-lg-0">
                        <div className="field_outer">
                            <div className="form-group">
                                <input placeholder="Company" type="text" className="form-control" value="" />
                            </div>
                            <div className="form-group">
                                <input placeholder="Phone" type="text" className="form-control" value="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="field_outer">
                            <div className="form-group">
                                <textarea name="" placeholder="Address" rows={4} className="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


const form = reduxForm<IPreliminaryForm, Props>({
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: false,
	form: 'SetupForm',
	enableReinitialize: true
})
export default SetupForm;