import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import cbre_icon from '../../images/logo-black.png';
import upload_icon from '../../images/upload-icon.jpg';
import { IState } from '../../../store/state';
import { connect } from 'react-redux';
import { isValidGUID } from '../../../helpers/utility-helper';

interface IMapStateToProps {
  projectId: string;
}
const LeftMenu: React.FC<IMapStateToProps> = props => {
  let urlProjectId:string="";
  let history=useHistory();
  const getGUID=()=>{
    history.location.pathname.split('/').forEach((data)=>{
      if(isValidGUID(data)){
        urlProjectId=data
        return;
      }
    })
    return urlProjectId;
  }
   urlProjectId=props.projectId?props.projectId:getGUID();
  let isDisable:boolean=(urlProjectId&&urlProjectId!="undefined")
  ?true:false;

  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <div id="sm_none" className="logo">
          <img src={cbre_icon} alt="CBRE PDS" />
        </div>
        <div className="cross-menu">
          MENU
          <button type="button" id="cross-inner" className="cross-sidebar">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <ul id="homeMenu" className="list-unstyled components">
        <p className="upload mb-0">
          <img src={upload_icon} alt="upload icon" />
          upload library
        </p>
        <li className="active">
          <Link data-test="ProjectLink"
            to={{
              pathname: '/Project/'+urlProjectId
            }}
          >
            customer enquiry
          </Link>
        </li>
        <li data-test="ProjectOverviewLink" className={isDisable?"":"link_disabled"}>
          <Link data-test="ProjectOverviewPath"
            to={{
              pathname: '/ProjectOverview/'+urlProjectId
            }}
          >
            project overview
          </Link>
        </li>
        <li className={isDisable?"":"link_disabled"}>
          <Link
            to={"/JustificationAuthorisation/"+urlProjectId}
            data-target="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="true"
            className="dropdown-toggle collapsed"
          >
            justification &amp; authorisation
          </Link>
          <ul className="collapse list-unstyled show" id="homeSubmenu">
            <li>
              <Link to={"/preliminaries/"+urlProjectId}>preliminaries</Link>
            </li>
            <li>
              <Link to={"/Subcontractor/"+urlProjectId}>subcontractors</Link>
            </li>
            <li>
              <Link to={"/Discounts/"+urlProjectId}>discounts </Link>
            </li>
          </ul>
        </li>
        <li className={isDisable?"":"link_disabled"}>
          <Link to="/">review &amp; submit</Link>
        </li>
        <li className={isDisable?"":"link_disabled"}>
          <Link to="/">review &amp; approve</Link>
        </li>
        <li className={isDisable?"":"link_disabled"}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    projectId: state.project.form.projectId
  };
};
export default connect(
  mapStateToProps
)(LeftMenu);
