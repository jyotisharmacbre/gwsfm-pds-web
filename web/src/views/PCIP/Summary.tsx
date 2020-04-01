/* istanbul ignore file */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IGeneralTableProps } from '../../components/Table/General/props';
import GeneralTable from '../../components/Table/General';
import { formatMessage } from '../../Translations/connectedIntlProvider';
import CirculationForm from '../../components/Forms/PCIPForms/CirculationForm';

const Summary: React.FC<IGeneralTableProps> = props => {
	return (
		<div className="container-fluid" data-test="review-approve-component">
			<div className="row">
				<div className="col-lg-12">
					<div className="custom-wrap form_style bg-transparent summary">
						<div className="row align-items-center mt-2 mb-3 mt-lg-3 mb-lg-4 pb-2">
							<div className="col-xl-4">
								<div className="heading-subtitle">
									<h1 className="m-0">Pre-Construction Information Phase</h1>
								</div>
							</div>
							<div className="col-xl-8">
								<div className="dashboard_bts mr-35 three-btn py-0 mt-4 mt-xl-0 d-flex justify-content-start justify-content-xl-end">
									<div className="select-wrapper">
										<select className="form-control">
											<option>PCIP Setup</option>
										</select>
									</div>
									<div className="select-wrapper">
										<select className="form-control">
											<option>PCIP</option>
										</select>
									</div>
									<button name="save" className="" type="button">COMPLETE</button>
								</div>
							</div>
						</div>

						<GeneralTable
							{...{
								headers: [
									{
										heading: formatMessage('LABEL_END_CUSTOMER_NAME'),
										subHeading: 'jojo'
									},
									{
										heading: formatMessage('MESSAGE_PROJECT_NAME'),
										subHeading: 'props.enquiryOverview.projectName'
									},
									{
										heading: formatMessage('MESSAGE_PROJECT_MANAGER'),
										subHeading: 'projectManager'
									},
									{
										heading: formatMessage('LABEL_CN_NUMBER'),
										subHeading: 'svfv'
									}
								],
								content: "",
								editActionClick: () => {
								}
							}}
						/>

						<CirculationForm />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Summary;