import React, { useState, useEffect } from 'react';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ILookup } from '../../../store/Lookups/Types/ILookup';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import Company from '../../../store/DynamicsData/InitialState/Company';
import * as actions from '../../../store/rootActions';
import { toast } from 'react-toastify';
import {
  getPropertyName,
  getFilterElementFromArray,
  calculateRank
} from '../../../helpers/utility-helper';
import { FormattedMessage } from 'react-intl';
import { dynamicsDivisions } from '../../../helpers/dynamicsDivisionData';
import { dynamicBusinessUnits } from '../../../helpers/dynamicBusinessData';

interface IProps {
  project: IProjectDetail;
  lookUpData: Array<ILookup>;
  currencySymbol: string;
}
const ProjectSummary: React.FC<IProps> = props => {
  const [projectStatus, setProjectStatus] = useState<string>('');
  const [typeOfEngagement, setTypeOfEngagement] = useState<string>('');
  const companyObj = new Company();
  const [companyName, setCompanyName] = useState<string>('');
  const [headOfProject, setHeadOfProject] = useState<string>('');
  const [projectOwner, setProjectOwner] = useState<string>('');
  const [projectManager, setProjectManager] = useState<string>('');
  const [contractor, setContractor] = useState<string>('');
  const [division, setDivision] = useState<string>('');
  const [businessUnit, setBusinessUnit] = useState<string>('');

  useEffect(() => {
    if (props.project.projectId) {
      if (props.project.companyId == '0')
        setCompanyName(props.project.otherCompanyName);
      else
        actions.getListOfCompanies(
          props.project.companyId,
          listOfCompaniesSuccess,
          failure
        );
      if (props.project.headOfProject)
        actions.getUserServiceCallback(
          props.project.headOfProject,
          headofProjectSuccess,
          failure
        );
      if (props.project.projectOwner)
        actions.getUserServiceCallback(
          props.project.projectOwner,
          projectOwnerSuccess,
          failure
        );
      if (props.project.projectManager)
        actions.getUserServiceCallback(
          props.project.projectManager,
          projectManagerSuccess,
          failure
        );
      if (props.project.contractorId) {
        if (props.project.contractorId == '0')
          setContractor(props.project.otherContractName);
        else
          actions.getListOfContract(
            props.project.contractorId,
            getContractorSuccess,
            failure
          );
      }
      let filterDivision = dynamicsDivisions.filter(
        element => element.DivisionId == props.project.divisionId
      );
      if (filterDivision && filterDivision[0])
        setDivision(filterDivision[0].Description);
      let filterBusinessUnit = dynamicBusinessUnits.filter(
        element => element.BusinessUnitId == props.project.businessUnitId
      );
      if (filterBusinessUnit && filterBusinessUnit[0])
        setBusinessUnit(filterBusinessUnit[0].Description);
    }
  }, [props.project]);

  useEffect(() => {
    if (
      props.project.projectId &&
      props.lookUpData &&
      props.lookUpData.length > 0
    ) {
      let filterStatus = props.lookUpData.filter(
        element =>
          element.lookupItem == LookupType.Project_Status &&
          element.lookupKey == props.project.status
      );
      if (filterStatus && filterStatus[0])
        setProjectStatus(filterStatus[0].description);
      let filterEngagementType = props.lookUpData.filter(
        element =>
          element.lookupItem == LookupType.Engagement_Type &&
          element.lookupKey == props.project.engagementId
      );
      if (filterEngagementType && filterEngagementType[0])
        setTypeOfEngagement(filterEngagementType[0].description);
    }
  }, [props.project, props.lookUpData]);

  const headofProjectSuccess = response => {
    let filter = response.find(ele => ele.email == props.project.headOfProject);
    setHeadOfProject(filter.lastName + ' ' + filter.firstname);
  };

  const projectOwnerSuccess = response => {
    let filter = response.find(ele => ele.email == props.project.projectOwner);
    setProjectOwner(filter.lastName + ' ' + filter.firstname);
  };
  const projectManagerSuccess = response => {
    let filter = response.find(
      ele => ele.email == props.project.projectManager
    );
    setProjectManager(filter.lastName + ' ' + filter.firstname);
  };
  const getContractorSuccess = response => {
    let filter = response.find(
      ele => ele.contractId == props.project.contractorId
    );
    if (filter) setContractor(filter.contractName);
  };
  const listOfCompaniesSuccess = response => {
    if (response && response.length > 0) {
      setCompanyName(
        getFilterElementFromArray(
          response,
          getPropertyName(companyObj, prop => prop.companyId),
          props.project.companyId,
          getPropertyName(companyObj, prop => prop.name)
        )
      );
    }
  };

  const failure = error => {
    toast.error('Some error occured');
  };

  return (
    <div className="RS_custom_block">
      <h4>
        <FormattedMessage id="HEADING_CUSTOMER_ENQUIRY" />
      </h4>
      <div className="RS_custom_inner">
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_CONTRACT" />
                </span>
                <p data-test="company">{contractor}</p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_DIVISION" />
                </span>
                <p data-test="company">{division}</p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_BUSINESS_UNIT" />
                </span>
                <p data-test="company">{businessUnit}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_PROJECT_MANAGER" />
                </span>
                <p>{projectManager}</p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_HEAD_OF_PROJECT" />
                </span>
                <p data-test="head-of-project">{headOfProject}</p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_CN_NUMBER" />
                </span>
                <p>{props.project.cnNumber}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_PROJECT" />
                </span>
                <p>{props.project.name}</p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_CDMNOTIFIABLE" />
                </span>
                <p>
                  <FormattedMessage
                    id={props.project.cdmNotifiable ? 'LABEL_YES' : 'LABEL_NO'}
                  />
                </p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_TYPE_OF_ENGAGEMENT" />
                </span>
                <p>{typeOfEngagement}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_PROBABILITY_OF_WINING" />
                </span>
                <p>{props.project.probabilityOfWinning}</p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_WEIGHTED_TCV" />
                </span>
                <p>
                  {props.currencySymbol}
                  {props.project.weightedTCV}
                </p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul>
              <li>
                <span>
                  <FormattedMessage id="LABEL_RANK" />
                </span>
                <p>
                  {calculateRank(
                    +props.project.probabilityOfWinning,
                    +props.project.approxValue
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="hr_line" />
        <div className="row">
          <div className="col-lg-12">
            <div className="scope_block">
              <h5>
                <FormattedMessage id="LABEL_PROJECT_SCOPE" />
              </h5>
              <ul>
                <li>{props.project.scope}</li>
              </ul>
            </div>
            <div className="comment_block">
              <h5>
                <FormattedMessage id="LABEL_COMMENTS" />
              </h5>
              <p>{props.project.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
