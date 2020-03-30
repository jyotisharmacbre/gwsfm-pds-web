import React from 'react';
import { faLightbulb, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { injectIntl, FormattedMessage } from 'react-intl';
import { confirmAlert } from '../../Popup/CustomModalPopup';
import IReactIntl from '../../../Translations/IReactIntl';
import ProjectStatus from '../../../enums/ProjectStatus';
import { formatMessage } from '../../../Translations/connectedIntlProvider';

interface IProps {
    status: number;
    statusName: string;
    onReactivate: () => void;
    handleBidLost: () => void;
    handleOnHold: () => void;
    handleOrderReceived: () => void;
    handleProjectLive: () => void;
    handleProjectCompleted: () => void;
}

const ProjectOverviewStatusTab: React.FC<IProps & IReactIntl> = props => {

    /* istanbul ignore next */
    const handleClickOutside = (event, popup, activityButton) => /* istanbul ignore next */ {
        const toggleTab = "toggleStatusTab";
        if (!event ||
            !popup ||
            !activityButton ||
            event.toElement?.offsetParent?.id == toggleTab ||
            event.srcElement?.id == toggleTab || //IE
            popup.contains(event.toElement?.offsetParent) ||
            popup.contains(event.srcElement) //IE
        ) return;

        popup.classList.remove('show');
        popup.classList.add('hide')
        activityButton.classList.remove('active');
    }

    const handleToggleStatusTab = () => /* istanbul ignore next */ {
        const element: any = document.getElementById('statusTab');
        const activityButton: any = document.getElementById('activaty_btn');
        if (element != null && activityButton != null) {
            document.removeEventListener('click', (e) =>
                handleClickOutside(e, element, activityButton), true);
            const isClassExists = element.classList.contains('show');
            if (isClassExists) {
                element.classList.add('hide');
                element.classList.remove('show');
                activityButton.classList.remove('active');
            } else {
                element.classList.remove('hide');
                element.classList.add('show');
                activityButton.classList.add('active');
                document.addEventListener('click', (e) =>
                    handleClickOutside(e, element, activityButton), true);
            }
        }
    }

    const isStatusTabLinkDisabled = props.status == ProjectStatus.BidLost ||
        props.status == ProjectStatus.OnHold ||
        props.status == ProjectStatus.Completed;

    const showPencilIcon = props.status != ProjectStatus.BidLost &&
        props.status != ProjectStatus.OnHold &&
        props.status != ProjectStatus.Completed;

    const showBidLostAndOnHoldOption = props.status != ProjectStatus.BidLost &&
        props.status != ProjectStatus.OnHold &&
        props.status != ProjectStatus.Live &&
        props.status != ProjectStatus.Completed &&
        props.status != ProjectStatus.OrderReceived;

    const showProjectLiveStatus = props.status == ProjectStatus.OrderReceived;
    const showCompletedStatus = props.status == ProjectStatus.Live;
    const showOrderRecievedStatus = props.status == ProjectStatus.JAApproved;

    const showActiveButton = props.status == ProjectStatus.BidLost ||
        props.status == ProjectStatus.OnHold;

    const showAlert = (eventHandler) => {
        confirmAlert({
            intl: props.intl,
            titleKey: "TITLE_CONFIRMATION",
            contentKey: "MESSAGE_PROJECT_STATUS_CHANGE",
            handleConfirm: () => eventHandler()
        })
    }

    /* istanbul ignore next */
    const handleOrderReceivedEvent = () => {
        handleToggleStatusTab();
        props.handleOrderReceived();
    }
    return (
        <div className="col-md-6 mt-4 mt-lg-0 d-flex justify-content-start justify-content-lg-end">
            <div id="activaty_btn" className="activate_status_box d-flex align-items-center">
                <div className="status_btn">
                    <div className="status-dropdown">
                        <div className="status-dropdown-btn toggle">
                            <span data-test="toggleStatusTab" id="toggleStatusTab" className={isStatusTabLinkDisabled ? "dropdown-placeholder link_disabled" : "dropdown-placeholder"} onClick={() => handleToggleStatusTab()}><FormattedMessage id="LABEL_STATUS" />:&nbsp; <strong>{props.statusName}
                            </strong>
                                {showPencilIcon ? <FontAwesomeIcon className="active mrgnlft10" icon={faPencilAlt} /> : null}
                            </span>
                        </div>

                        {showBidLostAndOnHoldOption ?
                            <div className="status-dropdown-menu hide status-hidden toggle-list" data-test="statusTab" id="statusTab">
                                <p><FormattedMessage id="TITLE_CHANGE_STATUS_TO" /></p>
                                <ul className="status-dropdown-list status-scrollable" >
                                    <li data-test="bidlost" className={(props.status == ProjectStatus.BidLost) ? "status-dropdown-item status-selected link_disabled" : "status-dropdown-item"} onClick={() => showAlert(props.handleBidLost)}>
                                        <a title="Bid Lost"><FormattedMessage id="TITLE_BID_LOST" /></a></li>
                                    <li data-test="onhold" className={(props.status == ProjectStatus.OnHold) ? "status-dropdown-item status-selected link_disabled" : "status-dropdown-item"} onClick={() => showAlert(props.handleOnHold)}>
                                        <a title="On Hold"><FormattedMessage id="TITLE_ON_HOLD" /></a>
                                    </li>
                                    {showOrderRecievedStatus ?
                                        <li data-test="orderReceived" className={"status-dropdown-item"} onClick={() => showAlert(handleOrderReceivedEvent)}>
                                            <a title="Order Received"><FormattedMessage id="TITLE_ORDER_RECEIVED" /></a>
                                        </li> : null}
                                </ul>
                            </div> : null}


                        {/*Live status */}
                        {showProjectLiveStatus &&
                            <div className="status-dropdown-menu hide status-hidden toggle-list" data-test="statusTab" id="statusTab">
                                <p><FormattedMessage id="TITLE_CHANGE_STATUS_TO" /></p>
                                <ul className="status-dropdown-list status-scrollable">
                                    <li data-test="live" className={"status-dropdown-item mrgnlft10"} onClick={() => showAlert(props.handleProjectLive)}>
                                        <a title={formatMessage("TITLE_LIVE")}><FormattedMessage id="TITLE_LIVE" /></a></li>
                                </ul>
                            </div>}

                        {/*Completed status */}
                        {showCompletedStatus &&
                            <div className="status-dropdown-menu hide status-hidden toggle-list" data-test="statusTab" id="statusTab">
                                <p><FormattedMessage id="TITLE_CHANGE_STATUS_TO" /></p>
                                <ul className="status-dropdown-list status-scrollable">
                                    <li data-test="completed" className={"status-dropdown-item mrgnlft10"} onClick={() => showAlert(props.handleProjectCompleted)}>
                                        <a title={formatMessage("TITLE_COMPLETED")}><FormattedMessage id="TITLE_COMPLETED" /></a></li>
                                </ul>
                            </div>}
                    </div>
                </div>

                {/* activate button */}
                {showActiveButton ?
                    <div className="status-dropdown-btn toggle mrgnrght10 mrgnt5 ml-2">
                        <span>
                            <button className="activate_btn" type="button" id="reactivateButton" data-test="activateButton"
                                onClick={() => showAlert(props.onReactivate)}>
                                <FontAwesomeIcon className="active mrgnrght10 activate_btn" icon={faLightbulb} /><FormattedMessage id="TITLE_ACTIVATE" />
                            </button>
                        </span>
                    </div> : null}
            </div>
        </div>
    )
}

export default injectIntl(ProjectOverviewStatusTab);
