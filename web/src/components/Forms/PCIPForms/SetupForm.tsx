/* istanbul ignore file */

import React from 'react';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Validate } from '../../../helpers/fieldValidations';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';

interface ISetupForm {

}
interface Props {

}
const SetupForm: React.FC<Props & InjectedFormProps<ISetupForm, Props>> = props => {
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
                                name=""
                                data-test="insurance"
                                type="text"
                                component={PdsFormInput}
                                className="required"
                                validate={[Validate.required('LABEL_INSURANCE'), Validate.maxLength(1000)]}
                                placeholderKey="Name surname"
                            />

                            <Field
                                name=""
                                data-test="insurance"
                                type="text"
                                component={PdsFormInput}
                                className="required"
                                validate={[Validate.required('LABEL_INSURANCE'), Validate.maxLength(1000)]}
                                placeholderKey="Email"
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 pr-lg-0">
                        <div className="field_outer">
                            <Field
                                name=""
                                data-test="insurance"
                                type="text"
                                component={PdsFormInput}
                                className="required"
                                validate={[Validate.required('LABEL_INSURANCE'), Validate.maxLength(1000)]}
                                placeholderKey="Company"
                            />

                            <Field
                                name=""
                                data-test="insurance"
                                type="number"
                                component={PdsFormInput}
                                className="required"
                                validate={[Validate.required('LABEL_INSURANCE'), Validate.maxLength(1000)]}
                                placeholderKey="Phone"
                            />

                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="field_outer">
                        <Field
						name="address"
						data-test="comments"
						rows="4"
						component={PdsFormTextArea}
						validate={[Validate.maxLength(5000)]}
						placeholderKey="Address"
					/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: IState) => ({

});

const form = reduxForm<ISetupForm, Props>({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: false,
    form: 'SetupForm',
    enableReinitialize: true
})(SetupForm);


export default connect(mapStateToProps)(form);
