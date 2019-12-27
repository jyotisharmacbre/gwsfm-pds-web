import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { History } from 'history';
import CalculationsSummaryTable from '../components/Table/CalculationsSummaryTable';
import PricingSummaryTable from '../components/Table/PricingSummaryTable';
import CalculationsSummaryType from '../enums/CalculationsSummaryType';
import * as actions from '../store/rootActions';
import { toast } from 'react-toastify';
import { getClassNameForProjectStatus } from '../helpers/utility-helper';
import { IState } from '../store/state';
import { FormattedMessage } from 'react-intl';

interface IProps {
	match: match<{ projectId: string }>;
	history: History;
}

interface IMapStateToProps {
	status: number;
}

interface IMapDispatchToProps {
	getProjectDetail: (projectId: string) => void;
}

const ReviewSubmit: React.FC<IProps & IMapStateToProps & IMapDispatchToProps> = props => {
	useEffect(() => {
		window.scrollTo(0, 0);
		props.getProjectDetail(props.match.params.projectId);
	}, []);

	const redirect = (module: string) => {
		return props.history.push(`/${module}/${props.match.params.projectId}`);
	};

	const updateProjectStatusToInReview = () => {
		actions.updateProjectStatusToInReview(
			props.match.params.projectId,
			updateProjectStatusToInReviewSuccess,
			updateProjectStatusToInReviewError
		);
	};

	const updateProjectStatusToInReviewSuccess = (data) => {
		toast.success('Submitted Successfully');
		props.history.push('/');
	};

	const updateProjectStatusToInReviewError = (data) => {
		toast.success('Some error occured');
	};

	return (
		<div className="container-fluid" data-test="review-approve-component">
			<div className="row">
				<div className="col-lg-12">
					<div className="custom-wrap">
						<div className="heading-subtitle">
							<h1>Review &#38; Submit</h1>
						</div>
						<div className="RS_custom_block">
							<h4>Customer Enquiry</h4>
							<div className="RS_custom_inner">
								<div className="row">
									<div className="col-lg-4 col-sm-6">
										<ul>
											<li>
												<span>company</span>
												<p>Lorem Ipsum Dolor</p>
											</li>
										</ul>
									</div>
									<div className="col-lg-4 col-sm-6">
										<ul>
											<li>
												<span>company</span>
												<p>Lorem Ipsum Dolor</p>
											</li>
										</ul>
									</div>
									<div className="col-lg-4 col-sm-6">
										<ul>
											<li>
												<span>company</span>
												<p>Lorem Ipsum Dolor</p>
											</li>
										</ul>
									</div>
								</div>
								<div className="hr_line" />
								<div className="row">
									<div className="col-lg-12">
										<div className="scope_block">
											<h5>Project Scope</h5>
											<ul>
												<li>hello world one!...</li>
												<li>hello world two!...</li>
											</ul>
										</div>
										<div className="comment_block">
											<h5>Comments</h5>
											<p>Would you like to run the app on another port instead?</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="RS_project_block mb-0">
							<h4>Project Overview</h4>
							<div className="RS_project_inner">
								<div className="row">
									<div className="col-lg-4 col-sm-6">
										<ul>
											<li>
												<span>Main Contractor</span>
												<p>Lorem Ipsum Dolor</p>
											</li>
										</ul>
									</div>
									<div className="col-lg-4 col-sm-6">
										<ul>
											<li>
												<span>company</span>
												<p>Lorem Ipsum Dolor</p>
											</li>
										</ul>
									</div>
									<div className="col-lg-4 col-sm-6">
										<ul>
											<li>
												<span>company</span>
												<p>Lorem Ipsum Dolor</p>
											</li>
										</ul>
									</div>
								</div>

								<div className="hr_line" />

								<div className="row">
									<div className="col-lg-12">
										<div className="plan_block">
											<h5>Project Plan</h5>
											<div className="row mb-4 justify-content-end">
												<div className="col-lg-2 mb-2 mb-lg-0">
													<label>Commence Date</label>
													<p>24/02/2019</p>
												</div>
												<div className="col-lg-2 mb-2 mb-lg-0">
													<label>Completion Date</label>
													<p>24/02/2019</p>
												</div>
												<div className="col-lg-8">
													<label>Project Milestones</label>
													<p>
														Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
														commodo ligula eget dolor. Aenean massa. Cum sociis natoque
														penatibus et magnis dis parturient montes, nascetur ridiculus mus.
														Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
												</p>
												</div>
											</div>
											<div className="comment_block">
												<h5>Comments</h5>
												<p>Would you like to run the app on another port instead?</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-xl-9">
								<PricingSummaryTable
									data-test="pricing-summary"
									projectId={props.match.params.projectId}
									showPreliminary={true}
									showSubContractor={true}
									showDiscount={true}
								/>
								<CalculationsSummaryTable
									data-test="calculation-summary"
									name={CalculationsSummaryType.other}
									projectId={props.match.params.projectId}
								/>
							</div>
						</div>

						<div className={`${getClassNameForProjectStatus(props.status)} two-side-btn pt-2`}>
							<button
								data-test="previous-button"
								type="button"
								className="active"
								onClick={() => redirect('Discounts')}
							>
								<FormattedMessage id='BUTTON_PREVIOUS'></FormattedMessage>
							</button>
							<button onClick={updateProjectStatusToInReview}
								type="button"
								name="next"
							>
								<FormattedMessage id='BUTTON_SUBMIT'></FormattedMessage>								
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: IState) => ({
	status: state.project.form.status
});

const mapDispatchToProps = dispatch => {
	return {
		getProjectDetail: projectId =>
			dispatch(actions.getProjectDetail(projectId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSubmit);