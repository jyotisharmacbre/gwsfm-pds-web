/* istanbul ignore file */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IGeneralTableProps } from '../../components/Table/General/props';
import GeneralTable from '../../components/Table/General';
import { formatMessage } from '../../Translations/connectedIntlProvider';


const Summary: React.FC<IGeneralTableProps> = props => {
    return (
        <div className="container-fluid" data-test="review-approve-component">
            <div className="row">
                <div className="col-lg-12">
                    <div className="custom-wrap form_style bg-transparent">
                        <div className="heading-subtitle">
                            <h1>Pre-Construction Information Phase Setup</h1>
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
                        {/* End project info block */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Summary;