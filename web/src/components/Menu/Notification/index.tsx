import React, { useEffect } from 'react';
import { INotification } from "../../../store/Notifications/Types/INotification";
import IReactIntl from "../../../Translations/IReactIntl";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { ILookup } from '../../../store/Lookups/Types/ILookup';


interface IMapStateToProps {
	notifications: Array<INotification>;
	showNotification: boolean;
	lookups: Array<ILookup>;
}


const Notification: React.FC<IMapStateToProps & IReactIntl> = (props) => {
	let history = useHistory();

	//add & remove class for pipeline and dashboard page
	const showClass = () => {
		return history.location.pathname == "/" ||
			history.location.pathname == "/Pipeline"
	}

	const getTemplate = (notificationType) => {
		return props.lookups?.find(x => x.lookupKey == notificationType && x.lookupItem == 'Notification_Template')?.description;
	}

	const getUnreadNotificationCount = () => {
		return props.notifications?.filter(x => x.status === 0).length;
	}

	return (
		<div>
			<i>
				<FontAwesomeIcon className="" icon={faBell} />
				{getUnreadNotificationCount() > 0 && <span className="badge badge-light"></span>}
			</i>
			{getUnreadNotificationCount()>0 ? <div className={`dropdown-menu notify_dropdown user-dropdown ${props.showNotification ? 'show' : 'hide'}
	  ${showClass() ? 'default' : 'all_pages'} `}>
				<ul>
					<li>
						<div className="notify_topbar">
							<span>({getUnreadNotificationCount()}) New Notifications</span>
							<span>Mark all as Read</span>
						</div>
					</li>
					{props.notifications.map(notification => {
						return (<li className="bg-grey">
							<a href={`/ReviewApprove/${notification.projectId}`}>
							<h4 className="title">
								{`${getTemplate(notification.notificationType)}`}
							</h4>
							<p className="brief">
								{notification.description}
							</p>
							</a>
							<span className="mark_sign">MARK READ</span>
						</li>)

					})}
				</ul>
			</div>
			:
     <div className={`dropdown-menu notify_dropdown user-dropdown ${props.showNotification ? 'show' : 'hide'}
	  ${showClass() ? 'default' : 'all_pages'} `}>
				<ul>
					<li>
						<p>No Notification for you</p>
					</li>
				</ul>
			</div>}
		</div>

	);
};


export default injectIntl(Notification);
