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
  let activeClass:string="";
  let links:Array<string>=["project","projectoverview","justificationauthorisation","preliminaries","subcontractor","discounts"]
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
  const getUrlPathName=()=>{
    history.location.pathname.split('/').forEach((data)=>{
      if(links.includes(data.toLowerCase())){
        activeClass=data
        return;
      }
    })
    return activeClass;
  }
   urlProjectId=props.projectId?props.projectId:getGUID();
   activeClass=activeClass?activeClass:getUrlPathName().toLowerCase();
  let isDisable:boolean=(urlProjectId&&urlProjectId!="undefined")
  ?true:false;

  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <div id="sm_none" className="logo">
        <Link data-test=""
            to={{
              pathname: "/"
            }}
          >
            <img src={cbre_icon} alt="CBRE PDS" />
          </Link>
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
        {/* <p className="upload mb-0">
          <img src={upload_icon} alt="upload icon" />
          upload library
        </p> */}
        <li className={activeClass=="project"?"active":""}>
          <Link data-test="ProjectLink"
            to={{
              pathname: '/Project/'+urlProjectId
            }}
          >
            customer enquiry
          </Link>
        </li>
        <li data-test="ProjectOverviewLink" className={isDisable?(activeClass=="projectoverview"?"active":""):"link_disabled"}>
          <Link data-test="ProjectOverviewPath"
            to={{
              pathname: '/ProjectOverview/'+urlProjectId
            }}
          >
            project overview
          </Link>
        </li>
        <li className={isDisable?
          ((activeClass=="justificationauthorisation"
          ||activeClass=="preliminaries"
          ||activeClass=="subcontractor"
          ||activeClass=="discounts")?"active":""):
          "link_disabled"}>
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
            <li className={activeClass=="preliminaries"?"subactive":""}>
              <Link to={"/preliminaries/"+urlProjectId}>preliminaries</Link>
            </li>
            <li className={activeClass=="subcontractor"?"subactive":""}>
              <Link to={"/Subcontractor/"+urlProjectId}>subcontractors</Link>
            </li>
            <li className={activeClass=="discounts"?"subactive":""}>
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
