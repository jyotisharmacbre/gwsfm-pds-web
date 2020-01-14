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
import { ILookup } from '../../../store/Lookups/Types/ILookup';
import { ProjectApproverTypeAndRangeMapping } from '../../../store/ProjectOverviewForm/Types/ProjectApproverTypeAndRangeMapping';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
interface IProps {
	currencySymbol: string;
}

interface IMapStateToProps {
	projectActivities: Array<IProjectApprovalActivitiy>;
	lookups: Array<ILookup>;
}

const ActivityFeedList: React.FC<IProps & IMapStateToProps> = (props) => {
	const [ activityFeedData, setActivityFeedData ] = useState<Array<IActivityFeed>>([]);

	useEffect(
		() => {
			if (props.projectActivities.length > 0) {
				let emails: Array<string> = [];
				props.projectActivities.map((data, index) => {
					emails.push(data.userId);
				});
				actions.getUserNamesForEmails(emails, getUserNamesForEmailsSuccess, failure);
			}
		},
		[ props.projectActivities ]
	);

	const getUserNamesForEmailsSuccess = (userData) => {
		if (props.lookups) {
			if (props.projectActivities.length > 0) {
				let activityFeed: Array<IActivityFeed> = [];
				props.projectActivities.map((data, index) => {
					let username = filterUserByEmailId(userData, data.userId);
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
				});
				setActivityFeedData(activityFeed);
			}
		}
	};
	const failure = (data) => {};

	const filterUserByEmailId = (data, emailId) => {
		let userName = '';
		let filter = data.filter((ele) => ele.email.toLowerCase() == emailId.toLowerCase());
		if (filter != undefined && filter[0] != undefined) userName = filter[0].lastName + ' ' + filter[0].firstname;
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
			<h3 className="feed_head">
				<FormattedMessage id="LABEL_ACTIVITY_FEED" />
			</h3>
			<section className="activity_feed">
				{activityFeedData.map((data) => (
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