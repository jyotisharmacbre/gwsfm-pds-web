import React from 'react';
import { FormattedMessage } from 'react-intl';
import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectApprovalActivityType from '../../../enums/ProjectApprovalActivityType';
import { formatDateAndTime, calendarStrings } from '../../../helpers/utility-helper';
import IActivityFeed from '../../../models/IActivityFeed';
import Moment from 'react-moment';

const ActivityFeed: React.FC<IActivityFeed> = (props) => {

	return (
		<div className="feed-block" data-test="activity-feed-component">
			{props.activityType == ProjectApprovalActivityType.UserQuery ? (
				<div className="feed-block-img feed-icon" data-test="user-icon">
					<FontAwesomeIcon className="" icon={faUser} />
				</div>
			) : (
					<div className="feed-block-img check-icon" data-test="approved-icon">
						<FontAwesomeIcon className="" icon={faCheck} />
					</div>
				)}
			<div className="feed-block-content">
				<h2 className="text-with-dots-20pr">
					<FormattedMessage
						id={
							props.activityType == ProjectApprovalActivityType.UserQuery ? (
								'LABEL_COMMENT_FROM'
							) : (
									'LABEL_APPROVED_BY'
								)
						}
					/>{' '}
					<span title={props.approvedBy}>{props.approvedBy}</span>
				</h2>
				<span className="feed-date-time" data-test="formated-date">
				<Moment calendar={calendarStrings}>{props.createdDate}</Moment>
				</span>
				<p className="MultiLine" data-test="activity-query">{props.query}</p>
			</div>
		</div>
	);
};

export default ActivityFeed;
