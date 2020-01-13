import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import cbre_icon from '../../images/logo-black.png';
import upload_icon from '../../images/upload-icon.jpg';
import { IState } from '../../../store/state';
import { connect } from 'react-redux';
import { isValidGUID } from '../../../helpers/utility-helper';
import { FormattedMessage } from 'react-intl';
import ProjectStatus from '../../../enums/ProjectStatus';

interface IMapStateToProps {
	projectId: string;
	status: number;
}
const LeftMenu: React.FC<IMapStateToProps> = (props) => {
	let urlProjectId: string = '';
	let activeClass: string = '';
	let links: Array<string> = [
		'project',
		'projectoverview',
		'justificationauthorisation',
		'preliminaries',
		'subcontractor',
		'discounts',
		'reviewsubmit',
		'reviewapprove'
	];
	let history = useHistory();
	const getGUID = () => {
		history.location.pathname.split('/').forEach((data) => {
			if (isValidGUID(data)) {
				urlProjectId = data;
				return;
			}
		});
		return urlProjectId;
	};
	const getUrlPathName = () => {
		history.location.pathname.split('/').forEach((data) => {
			if (links.includes(data.toLowerCase())) {
				activeClass = data;
				return;
			}
		});
		return activeClass;
	};
	urlProjectId = props.projectId ? props.projectId : getGUID();
	activeClass = activeClass ? activeClass : getUrlPathName().toLowerCase();
	let isDisable: boolean = urlProjectId && urlProjectId != 'undefined' ? true : false;

	const disableEnableMenu = (value: string) => {
		return activeClass == value ? 'active' : '';
	};
	const disableEnableSubActiveClass = (value: string) => {
		return activeClass == value ? 'subactive' : '';
	};

	return (
		<nav id="sidebar">
			<div className="sidebar-header">
				<div id="sm_none" className="logo">
					<Link
						data-test=""
						to={{
							pathname: '/'
						}}
					>
						<img src={cbre_icon} alt="CBRE PDS" />
					</Link>
				</div>
				<div className="cross-menu">
					MENU
					<button type="button" id="cross-inner" className="cross-sidebar">
						<span />
						<span />
						<span />
					</button>
				</div>
			</div>

			<ul id="homeMenu" className="list-unstyled components">
				<li className={disableEnableMenu('project')}>
					<Link
						data-test="ProjectLink"
						to={{
							pathname: '/Project/' + urlProjectId
						}}
					>
						<FormattedMessage id="HEADING_CUSTOMER_ENQUIRY" />
					</Link>
				</li>
				<li
					data-test="ProjectOverviewLink"
					className={isDisable ? disableEnableMenu('projectoverview') : 'link_disabled'}
				>
					<Link
						data-test="ProjectOverviewPath"
						to={{
							pathname: '/ProjectOverview/' + urlProjectId
						}}
					>
						<FormattedMessage id="MENU_PROJECT_OVERVIEW" />
					</Link>
				</li>
				<li
					className={
						isDisable ? (
							disableEnableMenu('justificationauthorisation') ||
							disableEnableMenu('preliminaries') ||
							disableEnableMenu('subcontractor') ||
							disableEnableMenu('discounts')
						) : (
							'link_disabled'
						)
					}
				>
					<Link
						to={'/JustificationAuthorisation/' + urlProjectId}
						data-target="#homeSubmenu"
						data-toggle="collapse"
						aria-expanded="true"
						className="dropdown-toggle collapsed"
					>
						<FormattedMessage id="MENU_JUSTIFICATION" />
					</Link>
					<ul className="collapse list-unstyled show" id="homeSubmenu">
						<li className={disableEnableSubActiveClass('preliminaries')}>
							<Link to={'/preliminaries/' + urlProjectId}>
								<FormattedMessage id="MENU_PRELIMINARIES" />
							</Link>
						</li>
						<li className={disableEnableSubActiveClass('subcontractor')}>
							<Link to={'/Subcontractor/' + urlProjectId}>
								<FormattedMessage id="MENU_SUBCONTRACTORS" />
							</Link>
						</li>
						<li className={disableEnableSubActiveClass('discounts')}>
							<Link to={'/Discounts/' + urlProjectId}>
								<FormattedMessage id="MENU_DISCOUNTS" />{' '}
							</Link>
						</li>
					</ul>
				</li>
				<li className={isDisable ? disableEnableMenu('reviewsubmit') : 'link_disabled'}>
					<Link
						to={{
							pathname: '/ReviewSubmit/' + urlProjectId
						}}
					>
						<FormattedMessage id="MENU_REVIEW_SUBMIT" />
					</Link>
				</li>
				{props.status == ProjectStatus.InReview && (
					<li
						data-test="review-approve"
						className={isDisable ? disableEnableMenu('reviewapprove') : 'link_disabled'}
					>
						<Link
							to={{
								pathname: '/ReviewApprove/' + urlProjectId
							}}
						>
							<FormattedMessage id="MENU_REVIEW_APPROVE" />
						</Link>
					</li>
				)}
				<li className={isDisable ? '' : 'link_disabled'}>
					<Link to="/">
						<FormattedMessage id="MENU_LOGOUT" />
					</Link>
				</li>
			</ul>
		</nav>
	);
};

const mapStateToProps = (state: IState) => {
	return {
		projectId: state.project.form.projectId,
		status: state.project.form.status
	};
};
export default connect(mapStateToProps)(LeftMenu);
