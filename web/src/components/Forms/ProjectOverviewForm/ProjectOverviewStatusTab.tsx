import React from 'react';
import { faLightbulb, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { injectIntl, FormattedMessage } from 'react-intl';

import { confirmAlert } from '../../Popup/CustomModalPopup';
import IReactIntl from '../../../Translations/IReactIntl';
import ProjectStatus from '../../../enums/ProjectStatus';
import { activeMocks } from 'nock/types';

interface IProps {
    status: number;
    statusName: string;
    onReactivate: () => void;
    handleBidLost: () => void;
    handleOnHold: () => void;
    handleOrderReceived:()=>void;
}




const ProjectOverviewStatusTab: React.FC<IProps & IReactIntl> = props => {
    const handleToggleStatusTab = () => {
        var element: any = document.getElementById('statusTab');
        if (element != null) {
            var isClassExists = element.classList.contains('show');
            if (isClassExists) {
                element.classList.add('hide');
                element.classList.remove('show');
            } else {
                element.classList.remove('hide');
                element.classList.add('show');
            }
        }
    }
    const activateStatus = () => {
        var element: any = document.getElementById('activaty_btn');
        if (element != null) {
            var isClassExists = element.classList.contains('active');
            if (isClassExists) {
                element.classList.remove('active');
            } else {
                element.classList.add('active');
            }
        }
    };

/* istanbul ignore next */
const handleOrderReceivedEvent=()=>{
    handleToggleStatusTab();
    props.handleOrderReceived();
}
    return (

        <div className="col-md-6 mt-4 mt-lg-0 d-flex justify-content-start justify-content-lg-end">
            <div id="activaty_btn" className="activate_status_box d-flex align-items-center" onClick={() => activateStatus()}>




                <div className="status_btn">
                    <div className="status-dropdown">
                        <div className="status-dropdown-btn toggle">

                            <span data-test="toggleStatusTab" id="toggleStatusTab" className={(props.status == ProjectStatus.BidLost || props.status == ProjectStatus.OnHold) ? "dropdown-placeholder link_disabled p-0" : "dropdown-placeholder p-0"} onClick={() => handleToggleStatusTab()}><FormattedMessage id="LABEL_STATUS" />:&nbsp; <strong>{props.statusName}
                            </strong>
                            {(props.status != ProjectStatus.BidLost && props.status != ProjectStatus.OnHold) ? <FontAwesomeIcon className="active mrgnlft10" icon={faPencilAlt} /> : null}
                            </span>
                        </div>
                        
                        {(props.status != ProjectStatus.BidLost && props.status != ProjectStatus.OnHold) ?
                            <div className="status-dropdown-menu hide status-hidden toggle-list" data-test="statusTab" id="statusTab">
                                <p><FormattedMessage id="TITLE_CHANGE_STATUS_TO" /></p>
                                <ul className="status-dropdown-list status-scrollable">
                                    <li data-test="bidlost" className={(props.status == ProjectStatus.BidLost) ? "status-dropdown-item mrgnlft10 status-selected link_disabled" : "status-dropdown-item mrgnlft10"} onClick={() =>
                                        confirmAlert({
                                            intl: props.intl,
                                            titleKey: "TITLE_CONFIRMATION",
                                            contentKey: "MESSAGE_PROJECT_STATUS_CHANGE",
                                            handleConfirm: () => props.handleBidLost()
                                        })
                                    }>
                                        <a title="Bid Lost"><FormattedMessage id="TITLE_BID_LOST" /></a></li>
                                    <li data-test="onhold" className={(props.status == ProjectStatus.OnHold) ? "status-dropdown-item mrgnlft10 status-selected link_disabled" : "status-dropdown-item mrgnlft10 "} onClick={() =>
                                        confirmAlert({
                                            intl: props.intl,
                                            titleKey: "TITLE_CONFIRMATION",
                                            contentKey: "MESSAGE_PROJECT_STATUS_CHANGE",
                                            handleConfirm: () => props.handleOnHold()
                                        })}>
                                        <a
                                            title="On Hold"><FormattedMessage id="TITLE_ON_HOLD" /></a>
                                    </li>
                                    {props.status==ProjectStatus.JAApproved?
                                    <li data-test="orderReceived" className={"status-dropdown-item mrgnlft10 "} onClick={() =>
                                        confirmAlert({
                                            intl: props.intl,
                                            titleKey: "TITLE_CONFIRMATION",
                                            contentKey: "MESSAGE_PROJECT_STATUS_CHANGE",
                                            handleConfirm: () => handleOrderReceivedEvent()
                                        })}>
                                        <a
                                            title="Order Received"><FormattedMessage id="TITLE_ORDER_RECEIVED" /></a>
                                    </li>:null}

                                </ul>

                            </div> : null}
                    </div>
                </div>
    
            {/* activate button */}
                {(props.status == ProjectStatus.BidLost || props.status == ProjectStatus.OnHold) ?
                    <div className="status-dropdown-btn toggle mrgnrght10 mrgnt5 ml-2">
                        <span>
                            <button className="activate_btn" type="button" id="reactivateButton" data-test="activateButton"
                                onClick={() =>
                                    confirmAlert({
                                        intl: props.intl,
                                        titleKey: "TITLE_CONFIRMATION",
                                        contentKey: "MESSAGE_PROJECT_REACTIVATE",
                                        handleConfirm: () => props.onReactivate()
                                    })}>
                                <FontAwesomeIcon className="active mrgnrght10 activate_btn" icon={faLightbulb} /><FormattedMessage id="TITLE_ACTIVATE" />
                                            </button>
                        </span>
                    </div>   : null}             
            </div>
        </div>

    )

}

export default injectIntl(ProjectOverviewStatusTab);
