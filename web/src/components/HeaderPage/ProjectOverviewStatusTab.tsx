import React from 'react';
import { faLightbulb,faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { confirmAlert } from '../Popup/CustomModalPopup';
import { injectIntl, FormattedMessage } from 'react-intl';
import IReactIntl from '../../Translations/IReactIntl';
import ProjectStatus from '../../enums/ProjectStatus';

interface IProps
{
    status:number;
    statusName:string;
    onReactivate:()=>void;
    handleBidLost:()=>void;
    handleOnHold:()=>void;
}

const ProjectOverviewStatusTab: React.FC<IProps&IReactIntl> = props => {  
    const handleToggleStatusTab=()=>{
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
    return(
      
             <div className="col-md-6 float-right">
                                        <div className="activate_status_box">
                                        {(props.status==ProjectStatus.bidlost || props.status==ProjectStatus.onhold)? <div className="status-dropdown-btn toggle mrgnrght10 mrgnt5">
                                                        <span>
                                                       
                                                        <button type="button"  id="reactivateButton" data-test="activateButton" 
                                                        onClick={()=>
                                                        confirmAlert({
                                                        intl:props.intl,
                                                        titleKey:"TITLE_CONFIRMATION",
                                                        contentKey:"MESSAGE_PROJECT_REACTIVATE",
                                                        handleConfirm:()=>props.onReactivate()
                                                        })}>
                                            <FontAwesomeIcon className="active mrgnrght10" icon={faLightbulb} />ACTIVATE
                                            </button>
                                                        </span>
                                           </div>:
                                            <div className="status_btn">
                                                <div className="status-dropdown">
                                                    <div className="status-dropdown-btn toggle">
                                                       
                                                        <span data-test="toggleStatusTab" id="toggleStatusTab" className="dropdown-placeholder" onClick={()=>handleToggleStatusTab()}>Status:&nbsp; <strong>{props.statusName}
                                                        (<FormattedMessage id="LABEL_LIVE"/>)</strong><FontAwesomeIcon className="active mrgnlft10" icon={faPencilAlt} />
                                                        </span>
                                                    </div>
                                                    <div className="status-dropdown-menu hide status-hidden toggle-list" data-test="statusTab" id="statusTab">
                                                        <p>Change Status to</p>
                                                        <ul className="status-dropdown-list status-scrollable">
                                                            <li data-test="bidlost"  className={(props.status==4)?"status-dropdown-item mrgnlft10 status-selected link_disabled":"status-dropdown-item mrgnlft10"} onClick={()=>
                                                                confirmAlert({
                                                                    intl:props.intl,
                                                                    titleKey:"TITLE_CONFIRMATION",
                                                                    contentKey:"MESSAGE_PROJECT_STATUS_CHANGE",
                                                                    handleConfirm:()=>props.handleBidLost()
                                                                  })
                                                                }> 
                                                                <a title="Bid Lost">Bid
                                                                    Lost</a></li>
                                                            <li data-test="onhold" className={(props.status==6)?"status-dropdown-item mrgnlft10 status-selected link_disabled":"status-dropdown-item mrgnlft10 "} onClick={()=>
                                                            confirmAlert({
                                                            intl:props.intl,
                                                            titleKey:"TITLE_CONFIRMATION",
                                                            contentKey:"MESSAGE_PROJECT_STATUS_CHANGE",
                                                            handleConfirm:()=>props.handleOnHold()
                                                            })}>
                                                                    <a
                                                                    title="On Hold">On
                                                                    Hold</a></li>

                                                        </ul>
                                                       
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
    ) 
   
}

export default injectIntl(ProjectOverviewStatusTab);
