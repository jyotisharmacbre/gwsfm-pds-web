import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import DashboardActionApprovalForm from '../components/Forms/Dashboard/ApprovalActionForm/DashboardActionApprovalForm';
import { IProjectDashboardGrid } from '../store/Dashboard/Types/IProjectDashboardGrid';
import { projectDashboardGridDetail, resetDashboardState } from '../store/Dashboard/Action';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { getProjectStatus } from '../store/rootActions';
import { formatMessage } from '../Translations/connectedIntlProvider';
import { getUserNamesForEmailsService } from '../store/UserService/Action';
import { IUserServiceData } from '../store/UserService/Types/IUserService';
import { isValidEmail } from '../helpers/fieldValidations';
import * as actions from '../store/rootActions';
import { displayUserName } from '../helpers/utility-helper';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import IProjectChartSummary from '../models/IProjectChartSummary';
import { LookupItems } from '../helpers/constants';
import StatusColorCode from '../enums/StatusColorCode';

interface IMapDispatchToProps {
	dashboardGridDetail: () => void;
	getLookups: () => void;
	handleGetUserNamesForEmails: (emails: any) => void;
	resetDashboardState: () => void;
	resetProjectOverviewState: () => void;
	resetSubContractorState: () => void;
	resetCustomerEnquiryState: () => void;
	resetPreliminaryState: () => void;
	resetDiscountState: () => void;
	getCurrentUserProfile: () => void;
	getProjectChartSummary: () => void;
}
interface IMapStateToProps {
	dashboardGridValues: Array<IProjectDashboardGrid>;
	valuesCount: number;
	lookupDetails: Array<ILookup>;
	userNamesForEmails: Array<IUserServiceData>;
	currentUserProfile: IUserServiceData;
	chartData: Array<IProjectChartSummary>;
}
const Dashboard: React.FC<IMapStateToProps & IMapDispatchToProps> = (props) => {
	const [chart, setChart] = useState<Array<IProjectChartSummary>>([]);
	useEffect(() => {
		props.getLookups();
		props.resetProjectOverviewState();
		props.resetSubContractorState();
		props.resetCustomerEnquiryState();
		props.resetPreliminaryState();
		props.resetDiscountState();
		props.getCurrentUserProfile();
		props.getProjectChartSummary();
		return () => {
			props.resetDashboardState();
		};
	}, []);
	useEffect(
		() => {
			if (props.dashboardGridValues.length > 0) {
				var allEmails = new Array();
				for (let recordNo in props.dashboardGridValues) {
					if (isValidEmail(props.dashboardGridValues[recordNo].modifiedBy))
						allEmails.push(props.dashboardGridValues[recordNo].modifiedBy);
				}
				allEmails = allEmails.filter(function (el) {
					return el != '';
				});
				const disinctvals = (value, index, self) => {
					return self.indexOf(value) === index;
				}
				const uniqueVals = allEmails.filter(disinctvals);
				if (allEmails.length > 0) props.handleGetUserNamesForEmails(uniqueVals);
			}
		},
		[props.dashboardGridValues]
	);
	//Following code will also re-render dashboardGrid on lnaguage change, as lookup data gets update on language change. 
	useEffect(() => {
		props.dashboardGridDetail();
	}, [props.lookupDetails]);

	useEffect(
		() => {
			if (props.lookupDetails.length > 0 && props.chartData.length > 0) {
				let data: Array<IProjectChartSummary> = [];
				let total = 0;
				props.chartData.forEach(ele => {
					total = total + ele.value;
				});
				Object.keys(StatusColorCode).forEach(element => {
					let lookup = props.lookupDetails.filter(look => look.lookupItem == LookupItems.Project_Status && look.description.replace(/ /g, '').toLowerCase() == element);
					if (lookup != undefined && lookup[0] != undefined) {
						let filterValue = props.chartData.find(data => data.name == lookup[0].lookupKey.toString());
						data.push({
							name: lookup[0].description,
							value: filterValue != undefined ? filterValue.value : 0,
							class: `${element}`,
							percentage: filterValue != undefined ? ((filterValue.value / total) * 100).toFixed(0) : '0'
						});
					}

				})
				setChart(data);
			}
		},
		[props.lookupDetails, props.chartData]
	);
	const customTooltip = (tooltip) => {
		if (tooltip.active) {
			return (
				<div className="custom-tooltip">
					<p className="label"><span>{tooltip.payload[0].payload.percentage}%</span>{`${tooltip.payload[0].name} : ${tooltip.payload[0].value}`}</p>
				</div>
			);
		}
		return null;
	}
	const renderCustomizedLabel = (content) => {
		return (
			`${content.payload.percentage}(%)`
		);
	};
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-xl-12">
						<div className="custom-wrap">
							<div className="row align-items-center mt-2 mb-3 mt-lg-3 mb-lg-4 pb-2">
								<div className="col-xl-6">
									<h1 className="top_Title2 m-0">
										{formatMessage('TITLE_WELCOME')} {!displayUserName(props.currentUserProfile) ? '...' : displayUserName(props.currentUserProfile)}
									</h1>
								</div>
								<div className="col-xl-6">
									<div className="dashboard_bts mr-35 three-btn pb-0 pt-0 mt-4 mt-xl-0 d-flex justify-content-start justify-content-xl-end">
										<Link to="/Pipeline">
											<button name="save" className="active mr-3" type="button">
												{formatMessage('BUTTON_PIPELINE')}
											</button>
										</Link>
										<Link to="/Project">
											<button type="button" name="next">
												{formatMessage('BUTTON_CREATE_NEW_PROJ')}
											</button>
										</Link>
									</div>
								</div>
							</div>
							<div className="top_Title top_Title2">
								<h2>{formatMessage('TITLE_MYACTIONS')}</h2>
							</div>
							<div className="table-grid-wrap pipeline_grid home_screen_table">
								<DashboardActionApprovalForm
									actionApprovalValues={props.dashboardGridValues}
									showValues={props.valuesCount}
									lookupValues={props.lookupDetails}
									userNamesForEmailsValues={props.userNamesForEmails}
								/>
							</div>

							<div className="top_Title top_Title2 justify-content-between">
								<h2>Analytics</h2>
								<h3>Total</h3>
							</div>
							<div className="pie_chart_wrap">
								<div className="row">
									<div className="col-md-7">
										<div className="pie-chart-inner">
											<PieChart
												width={500}
												height={400}
												margin={{
													top: 5, right: 30, left: 20, bottom: 5,
												}}>
												<Pie
													data={chart}
													isAnimationActive={false}
													cx={250}
													cy={200}
													outerRadius={170}
													fill="#8884d8"
													dataKey="value"
													label={renderCustomizedLabel}>
													{
														chart.map((entry, index) => entry.value > 0 && <Cell key={`cell-${index}`} fill={StatusColorCode[entry.class]} />)
													}
												</Pie>
												<Tooltip content={customTooltip} />
											</PieChart>
										</div>
									</div>
									<div className="col-md-5">
										<div className="info_block">
											<div className="heading-bar">
												<span>Legends</span>
												<span>No. of Projects</span>
											</div>
											<ul>
												{chart.map(element => {
													return (
														<li>
															<span className={`legend-state ${element.class}`}>
																{element.name} :
																<i style={{ background: StatusColorCode[element.class] }}></i>
															</span>
															<span data-test={element.class}>{element.value} ({element.percentage}%)</span>
														</li>
													);
												})}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: IState) => ({
	valuesCount: 5,
	lookupDetails: state.lookup.projectstatus,
	dashboardGridValues: state.dashboardGrid.actionApprovalDetails,
	userNamesForEmails: state.userService.userServiceData,
	currentUserProfile: state.userService.currentUserProfile,
	chartData: state.pipelineGrid.projectChartSummary.data
});

const mapDispatchToProps = (dispatch) => {
	return {
		getLookups: () => dispatch(getProjectStatus()),
		dashboardGridDetail: () => dispatch(projectDashboardGridDetail()),
		handleGetUserNamesForEmails: (allEmails) => dispatch(getUserNamesForEmailsService(allEmails)),
		resetDashboardState: () => dispatch(resetDashboardState()),
		resetProjectOverviewState: () => dispatch(actions.resetProjectOverviewState()),
		resetSubContractorState: () => dispatch(actions.resetSubContractorState()),
		resetCustomerEnquiryState: () => dispatch(actions.resetCustomerEnquiryState()),
		resetPreliminaryState: () => dispatch(actions.resetPreliminaryState()),
		resetDiscountState: () => dispatch(actions.resetDiscountState()),
		getCurrentUserProfile: () => dispatch(actions.getCurrentUserProfileForEmailsService()),
		getProjectChartSummary: () => dispatch(actions.getProjectChartSummary())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
