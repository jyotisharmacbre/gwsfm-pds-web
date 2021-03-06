/* istanbul ignore file */
import React from 'react';
import {useHistory } from 'react-router-dom';
import cbre_icon from '../../images/PDS_Logo_White.png';
import { IState } from '../../../store/state';
import { connect } from 'react-redux';
import { isValidGUID } from '../../../helpers/utility-helper';
import { FormattedMessage, injectIntl } from 'react-intl';
import ProjectStatus from '../../../enums/ProjectStatus';
import { isDirty, reset } from 'redux-form';
import { confirmAlert } from '../../Popup/CustomModalPopup';
import IReactIntl from '../../../Translations/IReactIntl';
import ClassType from '../../../enums/ClassType';
import useConfigContext from '../../../hooks/useConfigContext';

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
	resetPostCommentFormDirty: ()=> void;
}
const LeftMenu: React.FC<IMapStateToProps&IMapDispatchToProps&IReactIntl> = (props) => {
	let urlProjectId: string = '';
	let activeClass: string = '';
	let config = useConfigContext();
	let links: Array<string> = [
		'project',
		'projectoverview',
		'justificationauthorisation',
		'preliminaries',
		'subcontractor',
		'discounts',
		'reviewsubmit',
		'reviewapprove',
		'pcip',
		'setup',
		'summary',
		'tablecontent'
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

	const hideLeftMenu = ()=>{
		//Code here for remove left menu panel on click of any confirmation popup
		let sidebarElement:any = document.getElementById("sidebar");
		sidebarElement.classList.remove('active');
	}
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
			handleConfirm: () => {
				hideLeftMenu();
				redirectionToComponent(componentName,projectId)
			},
			handleReject:()=>{
				hideLeftMenu();
				activeLink();
			}
		})
	}
	else
	{
		//Add code to hide navigation on mobile screen post click on any menu link
		let element:any=document.getElementsByClassName("sidebar");
		if( element && element.length>0) {
			element[0].classList.remove('active');
			}
		
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
		if(props.isProjectOverviewFormDirty || props.isPostCommentFormDirty){enableLinkClass("projectOverviewLink",ClassType.Active)}
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
		if(props.isPostCommentFormDirty){props.resetPostCommentFormDirty();}		
		componentName?history.push(`/${componentName}/${projectId}`):history.push("/");
	}
	return (
		<nav id="sidebar" className="sidebar">
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
				{config.REACT_APP_SHOW_PCIP && <li id="pcipLink"
					className={
						(isDisable ? (
							disableEnableMenu('setup') ||
							disableEnableMenu('setup') ||
							disableEnableMenu('summary') ||
							disableEnableMenu('tablecontent')
						) : (
							'link_disabled'
						))+" dirtyCheck"
					}
				>
					<a  
						data-target="#homeSubmenu"
						data-toggle="collapse"
						aria-expanded="true"
						onClick={()=>isFormDirty('',urlProjectId)}
						className="dropdown-toggle collapsed cursorPntr"
					>
						PCIP
						<small>Pre-Construction Information Phase</small>
					</a>
					<ul className="collapse list-unstyled show" id="homeSubmenu">
						<li id="setupLink" className={disableEnableSubActiveClass('setup')+" dirtyCheck"}>
							<a className="cursorPntr" onClick={()=>isFormDirty('Setup',urlProjectId,"pcipLink")}>
								Setup
							</a>
						</li>
						<li id="summaryLink" className={disableEnableSubActiveClass('summary')+" dirtyCheck"}>
							<a className="cursorPntr" onClick={()=>isFormDirty('Summary',urlProjectId,"pcipLink")} >
								Summary
							</a>
						</li>
						<li id="tablecontentLink" className={disableEnableSubActiveClass('tablecontent')+" dirtyCheck"}>
							<a className="cursorPntr" onClick={()=>isFormDirty('TableContent',urlProjectId,"pcipLink")} >
								Table of Content
							</a>
						</li>
					</ul>
				</li>
				}
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
		resetDiscountFormState:()=>dispatch(reset("DiscountForm")),
		resetPostCommentFormDirty:()=>dispatch(reset("PostCommentForm"))
	};
};
export default injectIntl(connect(mapStateToProps,mapDispatchToProps)(LeftMenu));
