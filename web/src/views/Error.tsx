import React from 'react';
import error_icon from '../assests/images/error-page-icon.svg';
import warning_icon from '../assests/images/metro-warning.svg';
import unauthorised_icon from '../assests/images/unauthorised-icon.svg';

const Error = () => {
    return (
        <div className="multi_error_block">
            <div className="error_outer_wrap">
                <div className="error_wrapper">
                    <div className="error_title">
                        <h1>
                            <span>4</span>
                            <img src={error_icon} alt='error icon' />
                            <span>4</span>
                        </h1>
                    </div>
                    <div className="inner-content">
                        <h2>page not found</h2>
                    </div>
                    <div className="btn-wrap">
                        <span>
                            <button type="button" name="next">BACK TO DASHBOARD</button>
                        </span>
                    </div>
                </div>
            </div>

            <div className="error_outer_wrap">
                <div className="error_wrapper">
                    <div className="error_title">
                        <h1>
                            <span>4</span>
                            <img src={unauthorised_icon} alt='error icon' />
                            <span>1</span>
                        </h1>
                    </div>
                    <div className="inner-content">
                        <h2>UNAUTHORIZED ERROR</h2>
                        <p>unauthorized: access to this resource is denied</p>
                    </div>
                    <div className="btn-wrap">
                        <span>
                            <button type="button" name="next">BACK TO DASHBOARD</button>
                        </span>
                    </div>
                </div>
            </div>

            <div className="error_outer_wrap">
                <div className="error_wrapper">
                    <div className="error_title">
                        <h1>
                            <img className="px-0" src={warning_icon} alt='error icon' />
                        </h1>
                    </div>
                    <div className="inner-content">
                        <h2>DECEPTIVE SITE AHEAD</h2>
                        <p>view unsafe sites, content &amp; downloads</p>
                    </div>
                    <div className="btn-wrap">
                        <span>
                            <button type="button" name="next">BACK TO DASHBOARD</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;