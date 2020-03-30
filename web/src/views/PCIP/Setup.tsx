import React from 'react';
import SetupForm from '../../components/Forms/PCIPForms/SetupForm';

const Setup = () => {
    return (
        <div className="container-fluid" data-test="review-approve-component">
            <div className="row">
                <div className="col-lg-12">
                    <div className="custom-wrap form_style bg-transparent">
                        <div className="heading-subtitle">
                            <h1>Pre-Construction Information Phase Setup</h1>
                        </div>
                        <SetupForm />
                        {/* end calling setup form  */}
                        <div className="two-side-btn pt-3 justify-content-end mt-4">
                            <button data-test="previous-button" type="button" className="m-0">SAVE</button>
                        </div>
                        {/* end button at page end */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setup;