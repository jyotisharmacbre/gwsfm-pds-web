import React from 'react';
import error_icon from '../../assests/images/error-page-icon.svg';
import warning_icon from '../../assests/images/metro-warning.svg';
import unauthorised_icon from '../../assests/images/unauthorised-icon.svg';
import IError from './IError';
import { FormattedMessage } from 'react-intl';
import ErrorType from '../../enums/ErrorType';
import { useHistory } from 'react-router-dom';

const Error: React.FC<IError> = (props) => {
    const historyObj = useHistory();
    const redirectToDashboard = () => {
        if (props.history == undefined) {
            historyObj.push('');
            window.location.reload(true);
        }
        else
            props.history.push('');
    }

    return (
        <div className="multi_error_block">
            <div className="error_outer_wrap">
                <div className="error_wrapper">
                    {
                        props.location?.state && props.location?.state['type'] === ErrorType.pageNotFound ?
                            <React.Fragment >
                                <div className="error_title" data-test="pagenotFoundHeader">
                                    <h1>
                                        <span>4</span>
                                        <img src={error_icon} alt='error icon' />
                                        <span>4</span>
                                    </h1>
                                </div>
                                <div className="inner-content" data-test="pagenotFoundText">
                                    <h2>
                                        <FormattedMessage id="MESSAGE_ERROR_PAGE_NOT_FOUND" />
                                    </h2>
                                </div>
                            </React.Fragment> : null}
                    {
                        props.location?.state && props.location?.state['type'] === ErrorType.unauthorised ?
                            <React.Fragment>
                                <div className="error_title" data-test="unauthorisedHeader">
                                    <h1>
                                        <span>4</span>
                                        <img src={unauthorised_icon} alt='error icon' />
                                        <span>1</span>
                                    </h1>
                                </div>
                                <div className="inner-content" data-test="unauthorisedText">
                                    <h2>
                                        <FormattedMessage id="MESSAGE_ERROR_UNAUTHORISED_Header" />
                                    </h2>
                                    <p>
                                        <FormattedMessage id="MESSAGE_ERROR_UNAUTHORISED" />
                                    </p>
                                </div>
                            </React.Fragment> : null}

                    {
                        props.location?.state && props.location?.state['type'] === ErrorType.warning ?
                            <React.Fragment>
                                <div className="error_title" data-test="pageWarningHeader">
                                    <h1>
                                        <img className="px-0" src={warning_icon} alt='error icon' />
                                    </h1>
                                </div>
                                <div className="inner-content" data-test="pageWarningText">
                                    <h2>
                                        <FormattedMessage id="MESSAGE_PAGE_WARNING_HEADER" />
                                    </h2>
                                    <p>
                                        <FormattedMessage id="MESSAGE_PAGE_WARNING" />
                                    </p>
                                </div>
                            </React.Fragment> : null}
                    {
                        props.type === ErrorType.renderError ?
                            <React.Fragment>
                                <div className="error_title" data-test="pageWarningHeader">
                                    <h1>
                                        <img className="px-0" src={error_icon} alt='error icon' />
                                    </h1>
                                </div>
                                <div className="inner-content" data-test="pageWarningText">
                                    <h2>
                                        <FormattedMessage id="MESSAGE_ERROR" />
                                    </h2>
                                </div>
                            </React.Fragment> : null}

                    <div className="btn-wrap">
                        <span>
                            <button data-test="btnDashboard" type="button" name="btnDashboard" onClick={() => redirectToDashboard()}>
                                <FormattedMessage id="BUTTON_BACK_TO_DASHBAORD" />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Error;