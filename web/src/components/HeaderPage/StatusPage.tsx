import React from 'react';
import { faLightbulb,faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { confirmationAlert } from '../../helpers/utility-helper';
import { injectIntl } from 'react-intl';
import IReactIntl from '../../Translations/IReactIntl';

interface IProps
{
    status:number;
    onReactivate:()=>void;
    handleBidLost:()=>void;
    handleOnHold:()=>void;
}

const StatusPage: React.FC<IProps&IReactIntl> = props => {  
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
                                           
                                            <div className="status_btn">
                                                <div className="status-dropdown">
                                                    <div className="status-dropdown-btn toggle">
                                                        <span data-test="toggleStatusTab" id="toggleStatusTab" className="dropdown-placeholder" onClick={()=>handleToggleStatusTab()}>Status:&nbsp; <strong>In Progress
                                                                (Live)</strong><FontAwesomeIcon className="active mrgnlft10" icon={faPencilAlt} />
                                                        </span>
                                                    </div>
                                                    <div className="status-dropdown-menu hide status-hidden toggle-list" data-test="statusTab" id="statusTab">
                                                        <p>Change Status to</p>
                                                        <ul className="status-dropdown-list status-scrollable">
                                                            <li data-test="bidlost" className={(props.status==4)?"status-dropdown-item mrgnlft10 status-selected":"status-dropdown-item mrgnlft10"} onClick={()=>confirmationAlert(props.intl,"LABEL_PROJECT_MANAGER_EXPERIENCEN","LABEL_PROJECT_MANAGER_EXPERIENCEN",()=>props.handleBidLost)}> 
                                                                <a title="Bid Lost">Bid
                                                                    Lost</a></li>
                                                            <li data-test="onhold" className={(props.status==6)?"status-dropdown-item mrgnlft10 status-selected":"status-dropdown-item mrgnlft10 "} onClick={()=>confirmationAlert(props.intl,"LABEL_PROJECT_MANAGER_EXPERIENCEN","LABEL_PROJECT_MANAGER_EXPERIENCEN",()=>props.handleBidLost)}><a
                                                                    title="On Hold">On
                                                                    Hold</a></li>

                                                        </ul>
                                                        {(props.status==4 || props.status==6)?<button type="button"  id="reactivateButton" data-test="activateButton" onClick={()=>confirmationAlert(props.intl,"LABEL_PROJECT_MANAGER_EXPERIENCEN","LABEL_PROJECT_MANAGER_EXPERIENCEN",()=>props.onReactivate)}>
                                            <FontAwesomeIcon className="active mrgnrght10" icon={faLightbulb} />ACTIVATE
                                            </button>:null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    ) 
   
}

export default injectIntl(StatusPage);
