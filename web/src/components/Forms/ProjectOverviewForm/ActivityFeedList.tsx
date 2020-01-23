import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import ActivityFeed from './ActivityFeed';
import ProjectApprovalActivityType from '../../../enums/ProjectApprovalActivityType';
import { IProjectApprovalActivitiy } from '../../../store/ProjectOverviewForm/Types/IProjectApprovalActivitiy';
import { IProjectApprovals } from '../../../store/ProjectOverviewForm/Types/IProjectApprovals';
import IActivityFeed from '../../../models/IActivityFeed';
import * as actions from '../../../store/rootActions';
import * as services from '../../../services';
import { ILookup } from '../../../store/Lookups/Types/ILookup';
import { ProjectApproverTypeAndRangeMapping } from '../../../store/ProjectOverviewForm/Types/ProjectApproverTypeAndRangeMapping';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import { IUserServiceData } from '../../../store/UserService/Types/IUserService';
import { displayUserName } from '../../../helpers/utility-helper';
interface IProps {
	currencySymbol: string;
	handleGetUserNamesForEmails: (emails: Array<string>) => void;
}

interface IMapStateToProps {
	projectActivities: Array<IProjectApprovalActivitiy>;
	lookups: Array<ILookup>;
}

const ActivityFeedList: React.FC<IProps & IMapStateToProps> = (props) => {
	const [ activityFeedData, setActivityFeedData ] = useState<Array<IActivityFeed>>([]);
	const [ userNamesForEmails, setUserNamesForEmails ] = useState<Array<IUserServiceData>>([]);
	useEffect(
		() => {
			if (props.projectActivities.length > 0) {
				let emails: Array<string> = [];
				props.projectActivities.map((data, index) => {
					emails.push(data.userId);
				});
				services.getUsersForEmailsService(emails).then((response) => {
					setUserNamesForEmails(response.data);
				});
			}
		},
		[ props.projectActivities ]
	);
	useEffect(
		() => {
			if (userNamesForEmails.length > 0 && props.lookups) {
				if (props.projectActivities.length > 0) {
					let activityFeed: Array<IActivityFeed> = [];
					props.projectActivities.map((data, index) => {
						let username = filterUserByEmailId(userNamesForEmails, data.userId);
						activityFeed.push({
							activityType: data.activityType,
							approvedBy: username,
							query: generateQuery(
								data.query,
								username,
								props.currencySymbol,
								data.activityType,
								data.approverType,
								props.lookups,
								ProjectApproverTypeAndRangeMapping
							),
							createdDate: data.createdOn
						});
						setActivityFeedData(activityFeed);
					});
				}
			}
		},
		[ props.lookups, props.projectActivities, userNamesForEmails ]
	);
	const filterUserByEmailId = (data, emailId) => {
		let userName = '';
		let filter = data.filter((ele) => ele.email.toLowerCase() == emailId.toLowerCase());
		if (filter != undefined && filter[0] != undefined)
			userName = displayUserName(filter[0].firstname, filter[0].lastName);
		return userName;
	};
	const generateQuery = (query, username, currencySymbol, activityType, approverType, lookups, mapping) => {
		if (activityType == ProjectApprovalActivityType.SystemGenerated) {
			let approver = lookups.filter(
				(ele) => ele.lookupItem == LookupType.Project_Approver_Type && ele.lookupKey == approverType
			)[0].description;
			let reQuery = '';
			let template = mapping
				.filter((ele) => ele.type == approverType)[0]
				.approvalActivityRangeDesc.replace('{UserName}', username)
				.replace('{CurrencySymbol}', currencySymbol)
				.replace('{ApproverType}', approver)
				.toString();
			query = template;
		}
		return query;
	};

	return (
		<React.Fragment>
			{activityFeedData.length > 0 && (
				<h3 className="feed_head">
					<FormattedMessage id="LABEL_ACTIVITY_FEED" />
				</h3>
			)}
			<section className="activity_feed">
				{activityFeedData &&
					activityFeedData.map((data) => (
						<ActivityFeed
							activityType={data.activityType}
							approvedBy={data.approvedBy}
							query={data.query}
							createdDate={data.createdDate}
						/>
					))}
			</section>
		</React.Fragment>
	);
};

const mapStateToProps = (state: IState) => ({
	projectActivities: state.projectOverview.projectActivities.data,
	lookups: state.lookup.lookups
});

export default connect(mapStateToProps)(ActivityFeedList);
