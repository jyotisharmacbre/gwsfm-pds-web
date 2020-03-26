import React, { useState, useEffect } from 'react';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ILookup } from '../../../store/Lookups/Types/ILookup';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import { IProjectOverviewDetails } from '../../../store/ProjectOverviewForm/Types/IProjectOverviewDetails';
import { formatDate } from '../../../helpers/utility-helper';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

interface IProps {
  projectOverview: IProjectOverviewDetails;
  lookUpData: Array<ILookup>;
  oneditOverview: () => void;
}
const ProjectOverviewSummary: React.FC<IProps> = props => {
  let urlProjectId: string = '';
  const [projectStatus, setProjectStatus] = useState<string>('');
  const [enquiryType, setEnquiryType] = useState<string>('');
  const [workType, setWorkType] = useState<string>('');
  useEffect(() => {
    if (

      props.projectOverview.projectId &&
      props.lookUpData &&
      props.lookUpData.length > 0
    ) {
      let filterEnquiryType = props.lookUpData.filter(
        element =>
          element.lookupItem == LookupType.Enquiry_Type &&
          element.lookupKey ==
          props.projectOverview.projectAdditionalDetail.enquiryTypeId
      );
      if (filterEnquiryType && filterEnquiryType[0])
        setEnquiryType(filterEnquiryType[0].description);
      let filterWorkType = props.lookUpData.filter(
        element =>
          element.lookupItem == LookupType.Work_Type &&
          element.lookupKey ==
          props.projectOverview.projectAdditionalDetail.workTypeId
      );
      if (filterWorkType && filterWorkType[0])
        setWorkType(filterWorkType[0].description);
    }
  }, [props.projectOverview, props.lookUpData]);

  return (
    <div className="RS_custom_block">
      <div className="title_edit_btn">
        <h4>
          <FormattedMessage id="TITLE_PROJECT_OVERVIEW" />
        </h4>
        <button type="submit" name="oneditoverview" className="edit-btn" onClick={() => props.oneditOverview()}><FormattedMessage id="BUTTON_EDIT" /></button>
      </div>

      <div className="RS_custom_inner">
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_MAIN_CONTRACTOR" />
                </span>
                <p data-test="main-contractor">
                  {props.projectOverview.projectAdditionalDetail.mainContractor}
                </p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_ENQUIRY_RECEIVED_FROM" />
                </span>
                <p data-test="enquiry-reveived-form">
                  {
                    props.projectOverview.projectAdditionalDetail
                      .enquiryReceivedFrom
                  }
                </p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_TYPE_OF_ENQUIRY" />
                </span>
                <p data-test="enquiry-type">{enquiryType}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_CREDIT_CHECK_RESULT" />
                </span>
                <p data-test="credit-check-result">
                  {
                    props.projectOverview.projectAdditionalDetail
                      .creditCheckResult
                  }
                </p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_SITE_ADDRESS" />
                </span>
                <p data-test="site-address">
                  {props.projectOverview.projectAdditionalDetail.siteAddress}
                </p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_FORM_OF_CONTRACT" />
                </span>
                <p data-test="form-of-contract">
                  {props.projectOverview.projectAdditionalDetail.formOfContract}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_RETENTION" />
                </span>
                <p>{props.projectOverview.projectAdditionalDetail.retention}</p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_LIQUIDATED_DAMAGES" />
                </span>
                <p data-test="liquidated-damages">
                  {
                    props.projectOverview.projectAdditionalDetail
                      .liquidatedDamages
                  }
                </p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_INSURANCE" />
                </span>
                <p data-test="insurance">
                  {props.projectOverview.projectAdditionalDetail.insurance}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_WORK_TYPE" />
                </span>
                <p data-test="work-type">{workType}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="hr_line" />
        <div className="row">
          <div className="col-lg-12">
            <div className="plan_block">
              <h5>
                <FormattedMessage id="LABEL_PROJECT_PLAN" />
              </h5>
              <div className="row mb-4 justify-content-end">
                <div className="col-lg-2 mb-2 mb-lg-0">
                  <label>
                    <FormattedMessage id="LABEL_COMMENCE_DATE" />
                  </label>
                  <p data-test="commenceDate">
                    {formatDate(
                      props.projectOverview.projectAdditionalDetail.commenceDate
                    )}
                  </p>
                </div>
                <div className="col-lg-2 mb-2 mb-lg-0">
                  <label>
                    <FormattedMessage id="LABEL_COMPLETION_DATE" />
                  </label>
                  <p data-test="completionDate">
                    {formatDate(
                      props.projectOverview.projectAdditionalDetail
                        .completionDate
                    )}
                  </p>
                </div>
                <div className="col-lg-8">
                  <label>
                    <FormattedMessage id="LABEL_PROJECTMILE_STONES" />
                  </label>
                  <p>
                    {props.projectOverview.projectAdditionalDetail.milestones}
                  </p>
                </div>
              </div>
              <div className="row mb-4 justify-content-end">
                <div className="col-lg-2 mb-2 mb-lg-0">
                  <label>
                    <FormattedMessage id="LABEL_FIRST_VALUATION_DATE" />
                  </label>
                  <p data-test="firstValuationDate">
                    {formatDate(
                      props.projectOverview.projectAdditionalDetail
                        .firstValuationDate
                    )}
                  </p>
                </div>
                <div className="col-lg-2 mb-2 mb-lg-0">
                  <label>
                    <FormattedMessage id="LABEL_FINAL_ACCOUNT_DATE" />
                  </label>
                  <p data-test="finalAccountDate">
                    {formatDate(
                      props.projectOverview.projectAdditionalDetail
                        .finalAccountDate
                    )}
                  </p>
                </div>
                <div className="col-lg-8">
                  <label>
                    <FormattedMessage id="LABEL_VALUATION_INTERVALS" />
                  </label>
                  <p>
                    {
                      props.projectOverview.projectAdditionalDetail
                        .valuationIntervals
                    }
                  </p>
                </div>
                <div className="col-lg-8">
                  <label>
                    <FormattedMessage id="LABEL_PAYMENT_TERMS" />
                  </label>
                  <p>
                    {props.projectOverview.projectAdditionalDetail.paymentTerms}
                  </p>
                </div>
              </div>
              <div className="comment_block">
                <h5>
                  <FormattedMessage id="LABEL_COMMENTS" />
                </h5>
                <p>{props.projectOverview.projectAdditionalDetail.comments}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewSummary;