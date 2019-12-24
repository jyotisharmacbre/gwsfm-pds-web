import React,{useEffect} from 'react';
import { match } from 'react-router-dom';
import { History } from 'history';
import CalculationsSummaryTable from '../components/Table/CalculationsSummaryTable';
import PricingSummaryTable from '../components/Table/PricingSummaryTable';
import CalculationsSummaryType from '../enums/CalculationsSummaryType';

interface IProps {
	match: match<{ projectId: string }>;
	history: History;
}

const ReviewSubmit: React.FC<IProps> = (props: IProps) => {
	useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

	const redirect = (module: string) => {
		return props.history.push(`/${module}/${props.match.params.projectId}`);
	};
	return (
		<div className="container-fluid" data-test="review-approve-component">
			<div className="row">
				<div className="col-lg-12">
					<div className="custom-wrap">
						<div className="heading-subtitle">
							<h1>Review &#38; Submit</h1>
						</div>
						<div className="custom_block">
							<h4>Customer Enquiry</h4>
							<div className="row">
								<div className="col-lg-4">
									<ul>
										<li>
											<span>company</span>
											<p>Lorem Ipsum Dolor</p>
										</li>
									</ul>
								</div>
								<div className="col-lg-4">
									<ul>
										<li>
											<span>company</span>
											<p>Lorem Ipsum Dolor</p>
										</li>
									</ul>
								</div>
								<div className="col-lg-4">
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

						<div className="project_block">
							<h4>Project Overview</h4>
							<div className="row">
								<div className="col-lg-4">
									<ul>
										<li>
											<span>Main Contractor</span>
											<p>Lorem Ipsum Dolor</p>
										</li>
									</ul>
								</div>
								<div className="col-lg-4">
									<ul>
										<li>
											<span>company</span>
											<p>Lorem Ipsum Dolor</p>
										</li>
									</ul>
								</div>
								<div className="col-lg-4">
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
										<div className="row">
											<div className="col-md-2">
												<label>Commence Date</label>
												<p>24/02/2019</p>
											</div>
											<div className="col-md-2">
												<label>Completion Date</label>
												<p>24/02/2019</p>
											</div>
											<div className="col-md-8">
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
							<div className="row">
								<div className="col-xl-12">
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
						</div>
						<div className="three-btn">
							<button
								data-test="previous-button"
								type="button"
								className="active"
								onClick={() => redirect('Discounts')}
							>
								PREVIOUS
							</button>
							{/* <button
                                type="button"
                                name="next"
                                className="ml-auto"
                            >
                                QUERY
                            </button> */}
							<button type="button" name="next">
								APPROVE
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewSubmit;
