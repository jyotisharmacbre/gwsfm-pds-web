import React from 'react';
import {useHistory } from 'react-router-dom';
import cbre_icon from '../../images/logo-black.png';
import { IState } from '../../../store/state';
import { connect } from 'react-redux';
import { isValidGUID } from '../../../helpers/utility-helper';
import { FormattedMessage, injectIntl } from 'react-intl';
import ProjectStatus from '../../../enums/ProjectStatus';
import { isDirty, reset } from 'redux-form';
import { confirmAlert } from '../../Popup/CustomModalPopup';
import IReactIntl from '../../../Translations/IReactIntl';
import ClassType from '../../../enums/ClassType';

interface IMapStateToProps {
	projectId: string;
	status: number;
	isProjectFormDirty:boolean,
	isProjectOverviewFormDirty:boolean,
	isPreliminaryFormDirty:boolean,
	isSubContractorFormDirty:boolean,
	isDiscountFormDirty:boolean,
	isPostCommentFormDirty: boolean,
	intl:any
}
interface IMapDispatchToProps {
	resetProjectFormState:()=>void;
	resetProjectOverviewFormState:()=>void;
	resetPreliminaryFormState:()=>void;
	resetSubContractorFormState:()=>void;
	resetDiscountFormState:()=>void;
}
const LeftMenu: React.FC<IMapStateToProps&IMapDispatchToProps&IReactIntl> = (props) => {
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
		return activeClass == value ? ClassType.Active : '';
	};
	const disableEnableSubActiveClass = (value: string) => {
		return activeClass == value ? ClassType.SubActive : '';
	};
	const isFormDirty=(componentName:string,projectId:string,id?:string)=>{
if( props.isProjectFormDirty||
	props.isProjectOverviewFormDirty||
	props.isPreliminaryFormDirty||
	props.isSubContractorFormDirty||
	props.isDiscountFormDirty ||
	props.isPostCommentFormDirty)
	{
		confirmAlert({
			intl: props.intl,
			titleKey: 'TITLE_CONFIRMATION',
			contentKey: 'MESSAGE_DIRTY_CHECK',
			handleConfirm: () => redirectionToComponent(componentName,projectId),
			handleReject:()=>activeLink()
		})
	}
	else
	{
		redirectionToComponent(componentName,projectId);
	}
	}
	 const enableLinkClass=(id:string,classname:string)=>{
		let element:any=document.getElementById(id);
		element.classList.add(classname);
	 }
	 const disableLinkClass=()=>{
		let element:any=document.getElementsByClassName("dirtyCheck");
		if(element)
		{
			for(let i=0;i<element.length;i++)
			{
				element[i].classList.remove(ClassType.Active);
				element[i].classList.remove(ClassType.SubActive);
			}
	 }
	}
	 const activeLink=()=>{
		disableLinkClass();
		if(props.isProjectFormDirty){enableLinkClass("projectLink",ClassType.Active)}
		if(props.isProjectOverviewFormDirty){enableLinkClass("projectOverviewLink",ClassType.Active)}
		if(props.isPreliminaryFormDirty){enableLinkClass("justificationauthorisationLink",ClassType.Active);enableLinkClass("preliminariesLink",ClassType.SubActive)}
		if(props.isSubContractorFormDirty){enableLinkClass("justificationauthorisationLink",ClassType.Active);enableLinkClass("subcontractorLink",ClassType.SubActive)}
		if(props.isDiscountFormDirty){enableLinkClass("justificationauthorisationLink",ClassType.Active);enableLinkClass("discountsLink",ClassType.SubActive)}
		
	}
    const redirectionToComponent=(componentName:string,projectId:string)=>{
		if(props.isDiscountFormDirty){props.resetDiscountFormState();}
		if(props.isProjectFormDirty){props.resetProjectFormState();}
		if(props.isProjectOverviewFormDirty){props.resetProjectOverviewFormState();}
		if(props.isPreliminaryFormDirty){props.resetPreliminaryFormState();}
		if(props.isSubContractorFormDirty){props.resetSubContractorFormState();}
		componentName?history.push(`/${componentName}/${projectId}`):history.push("/");
	}
	return (
		<nav id="sidebar">
			<div className="sidebar-header">
				<div id="sm_none" className="logo">
					<a className="cursorPntr"
						data-test=""
						onClick={()=>isFormDirty('','')}
					>
						<img src={cbre_icon} alt="CBRE PDS" onClick={()=>isFormDirty('','')} />
					</a>
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
				<li id="projectLink" className={disableEnableMenu('project')+" dirtyCheck"}>
					<a className="cursorPntr"
						data-test="ProjectLink" onClick={()=>isFormDirty('Project',urlProjectId)}	
					>
						<FormattedMessage id="HEADING_CUSTOMER_ENQUIRY" />
					</a>
				</li>
				<li id="projectOverviewLink"
					data-test="ProjectOverviewLink"
					className={(isDisable ? disableEnableMenu('projectoverview') : 'link_disabled')+" dirtyCheck"}
				>
					<a className="cursorPntr"
						data-test="ProjectOverviewPath"
						onClick={()=>isFormDirty('ProjectOverview',urlProjectId)}
					>
						<FormattedMessage id="MENU_PROJECT_OVERVIEW" />
					</a>
				</li>
				<li id="justificationauthorisationLink"
					className={
						(isDisable ? (
							disableEnableMenu('justificationauthorisation') ||
							disableEnableMenu('preliminaries') ||
							disableEnableMenu('subcontractor') ||
							disableEnableMenu('discounts')
						) : (
							'link_disabled'
						))+" dirtyCheck"
					}
				>
					<a  
						data-target="#homeSubmenu"
						data-toggle="collapse"
						aria-expanded="true"
						onClick={()=>isFormDirty('JustificationAuthorisation',urlProjectId)}
						className="dropdown-toggle collapsed cursorPntr"
					>
						<FormattedMessage id="MENU_JUSTIFICATION" />
					</a>
					<ul className="collapse list-unstyled show" id="homeSubmenu">
						<li id="preliminariesLink" className={disableEnableSubActiveClass('preliminaries')+" dirtyCheck"}>
							<a className="cursorPntr" onClick={()=>isFormDirty('preliminaries',urlProjectId,"justificationauthorisationLink")}>
								<FormattedMessage id="MENU_PRELIMINARIES" />
							</a>
						</li>
						<li id="subcontractorLink" className={disableEnableSubActiveClass('subcontractor')+" dirtyCheck"}>
							<a className="cursorPntr" onClick={()=>isFormDirty('Subcontractor',urlProjectId,"justificationauthorisationLink")} >
								<FormattedMessage id="MENU_SUBCONTRACTORS" />
							</a>
						</li>
						<li id="discountsLink" className={disableEnableSubActiveClass('discounts')+" dirtyCheck"}>
							<a className="cursorPntr" onClick={()=>isFormDirty('Discounts',urlProjectId,"justificationauthorisationLink")} >
								<FormattedMessage id="MENU_DISCOUNTS" />{' '}
							</a>
						</li>
					</ul>
				</li>
				<li id="reviewsubmitLink" className={(isDisable ? disableEnableMenu('reviewsubmit') : 'link_disabled')+" dirtyCheck"}>
					<a className="cursorPntr"
					 onClick={()=>isFormDirty('ReviewSubmit',urlProjectId)}
					>
						<FormattedMessage id="MENU_REVIEW_SUBMIT" />
					</a>
				</li>
				{props.status == ProjectStatus.InReview && (
					<li
						data-test="review-approve"
						className={(isDisable ? disableEnableMenu('reviewapprove') : 'link_disabled')+" dirtyCheck"}
					>
						<a className="cursorPntr"
						onClick={()=>isFormDirty('ReviewApprove',urlProjectId)}
						>
							<FormattedMessage id="MENU_REVIEW_APPROVE" />
						</a>
					</li>
				)}
				
			</ul>
		</nav>
	);
};

const mapStateToProps = (state: IState) => {
	return {
		isProjectFormDirty:isDirty("ProjectForm")(state),
		isProjectOverviewFormDirty:isDirty("projectOverviewForm")(state),
		isPreliminaryFormDirty:isDirty("PreliminaryForm")(state),
		isSubContractorFormDirty:isDirty("subContractorForm")(state),
		isDiscountFormDirty:isDirty("DiscountForm")(state),
		projectId: state.project.form.projectId,
		status: state.project.form.status,
		isPostCommentFormDirty:isDirty("PostCommentForm")(state)
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		resetProjectFormState:()=>dispatch(reset("ProjectForm")),
		resetProjectOverviewFormState:()=>dispatch(reset("projectOverviewForm")),
		resetPreliminaryFormState:()=>dispatch(reset("PreliminaryForm")),
		resetSubContractorFormState:()=>dispatch(reset("subContractorForm")),
		resetDiscountFormState:()=>dispatch(reset("DiscountForm"))
	};
};
export default injectIntl(connect(mapStateToProps,mapDispatchToProps)(LeftMenu));
