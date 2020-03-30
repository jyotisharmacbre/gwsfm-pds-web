import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../../store/state';
import moment from 'moment';
import { Link } from 'react-router-dom';
import GridTable from '../../../Table/GridTable';
import { injectIntl, FormattedMessage } from 'react-intl';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { IProjectDashboardGrid } from '../../../../store/Dashboard/Types/IProjectDashboardGrid';
import IReactIntl from '../../../../Translations/IReactIntl';
import { ILookup } from '../../../../store/Lookups/Types/ILookup';
import { getLookupDescription, displayUserName } from '../../../../helpers/utility-helper';
import { LookupItems } from '../../../../helpers/constants';
import { IUserServiceData } from '../../../../store/UserService/Types/IUserService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { formatMessage } from '../../../../Translations/connectedIntlProvider';
import useConfigContext from '../../../../hooks/useConfigContext';
import DashboardApprovalStatusAndClassMapping from '../../../../store/Dashboard/Types/DashboardApprovalStatusAndClassMapping';

interface Props {
	actionApprovalValues: Array<IProjectDashboardGrid>;
	showValues: number;
	lookupValues: Array<ILookup>;
	userNamesForEmailsValues: Array<IUserServiceData>;
}
let DashboardActionApprovalForm: React.FC<Props & InjectedFormProps<Array<IProjectDashboardGrid>, Props>> = (props) => {
	const [gridData, setGridData] = useState<Array<IProjectDashboardGrid>>([]);
	const config = useConfigContext();
	useEffect(
		() => {
			if (
				props.actionApprovalValues &&
				props.actionApprovalValues.length > 0 &&
				props.lookupValues &&
				props.userNamesForEmailsValues &&
				props.showValues
			) {
				const actionApprovalvalues = JSON.parse(JSON.stringify(props.actionApprovalValues));
				setGridData(
					getActionApprovalValues(
						actionApprovalvalues,
						props.lookupValues,
						props.userNamesForEmailsValues,
						props.showValues
					)
				);
			}
		},
		[props.actionApprovalValues, props.lookupValues, props.userNamesForEmailsValues, props.showValues]
	);

	const getActionApprovalValues = (data, allLookups, namesAndEmails, countVals) => {
		let result =
			data &&
			data.map(function (rowProject) {
				if (allLookups.length > 0 && namesAndEmails) {
					let approvalStatusClass = DashboardApprovalStatusAndClassMapping.find(x => x.approvalStatus == rowProject.approvalStatus);
					rowProject.approvalStatus = !isNaN(rowProject.approvalStatus) ? getLookupDescription(
						allLookups,
						rowProject.approvalStatus,
						LookupItems.Project_Approval_Sign_Off_Status
					) : rowProject.approvalStatus;
					rowProject['approvalStatusClass'] = `status_design ${approvalStatusClass?.className}`
					var mailObj = namesAndEmails.find(
						lk => lk.email && rowProject.modifiedBy && lk.email.toUpperCase() === rowProject.modifiedBy.toUpperCase()
					);
					rowProject.modifiedBy = mailObj
						? `${displayUserName(mailObj)}`
						: rowProject.modifiedBy;
					rowProject.name = (
						<Link
							to={{
								pathname: `/ReviewApprove/${rowProject.projectId}`,
								state: { fromDashboard: true }
							}}
						>
							{rowProject.name}
						</Link>
					);
					rowProject.modifiedOn =
						rowProject.modifiedOn != '' ? moment(rowProject.modifiedOn).format(config.REACT_APP_DATE_FORMAT) : '';
				}
				return rowProject;
			});
		return result;
	};
	return (
		<React.Fragment>
			{gridData.length > 0 ? (
				<GridTable
					columns={getTableColumns()}
					data={gridData}
					sorting={false}
					className="price-table home_screen_table"
					ActionList={[]}
				/>
			) : (
					<span className="table-row-no-pending-actions">
						<FontAwesomeIcon className="active" icon={faExclamation} />
						<FormattedMessage id="HOMESCREEN_GRID_NO_ACTION_MESSAGE" />
					</span>
				)}
		</React.Fragment>
	);
};
const getTableColumns = () => {
	return [
		{
			title: formatMessage("HOMESCREEN_GRID_COLUMN_NAME"),
			field: 'name'
		},
		{
			title: formatMessage("HOMESCREEN_GRID_COLUMN_UPDATEDBY"),
			field: 'modifiedBy'
		},
		{
			title: formatMessage("HOMESCREEN_GRID_COLUMN_DATE"),
			field: 'modifiedOn'
		},
		{
			title: formatMessage("HOMESCREEN_GRID_COLUMN_STATUS"),
			field: 'approvalStatus',
			class: 'approvalStatusClass'
		}
	];
};

const mapStateToProps = (state: IState) => ({
	initialValues: state.dashboardGrid.actionApprovalDetails
});

const form = reduxForm<Array<IProjectDashboardGrid>, Props>({
	form: 'DashboardActionApprovalForm',
	enableReinitialize: true
})(DashboardActionApprovalForm);
export default connect(mapStateToProps)(form);
