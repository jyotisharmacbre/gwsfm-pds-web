import React, { useEffect } from 'react';
import '../components/Forms/PreliminaryForm/all.css';
import '../components/Forms/PreliminaryForm/customSelect.css';
import '../components/Forms/PreliminaryForm/style.css';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { useHistory } from 'react-router-dom';
import * as actions from '../store/rootActions';
import PreliminaryForm from '../components/Forms/PreliminaryForm/PreliminaryForm';
import PreliminarySummaryView from "./PreliminarySummaryView";
import { IPreliminaries } from '../store/Preliminaries/Types/IPreliminaries';
import {convertIntoDatabaseModel} from "../store/Preliminaries/DataWrapper";
import { toast } from 'react-toastify';
import Notify from '../enums/Notify';
interface IMapStateToProps {
  preliminaryDetails: Array<IPreliminariesComponentDetails>;
  match:any;
  notify: Notify;
}
interface IMapDispatchToProps {
  preliminaryAdd: (
    preliminaryDetails: Array<IPreliminaries>
      ) => void;
  preliminaryEdit: (
    preliminaryDetails:  Array<IPreliminaries>
  ) => void;
  getPreliminaryDetails: (projectId: string) => void;
  getLookupDetails: (projectId: string) => void;
  updateInputField:(inputData:any)=>void;
}

const Preliminaries: React.FC<
  IMapStateToProps & IMapDispatchToProps
> = props => {
  let history = useHistory();
  let paramProjectId:string= props.match.params.projectId;

  useEffect(() => {
    if (
      paramProjectId!= null &&
      paramProjectId != '' &&
      paramProjectId != undefined
    ) {
      if(sessionStorage.getItem("lookupData")!=null&&(sessionStorage.getItem("lookupData")!=undefined))
      {
        props.getPreliminaryDetails(paramProjectId);
      }
      else
      {
        props.getLookupDetails(paramProjectId);
      }
   
    }
  }, []);
  useEffect(() => {
    if (props.notify == Notify.success) {
        toast.success('Data Saved Successfully');
      }
      else
      {
        toast.error('Error occured.Please contact to administrator.');
      }
  }, [props.notify]);
  const handleExpandAllEvent = () => {
    var element: any = document.getElementsByClassName('expandAll');
    for(let i=0;i<element.length;i++)
    {
      element[i].classList.remove('hide');
      element[i].classList.add('show');
    }
  };
  const handleToggle = (id: string) => {
    var element: any = document.getElementById('collapse_' + id);
    if(element!=null)
    {
    var isClassExists = element.classList.contains('show');
    if (isClassExists) {
      element.classList.add('hide');
      element.classList.remove('show');
    } else {
      element.classList.remove('hide');
      element.classList.add('show');
    }
  }
  };
  const handleSaveData = (
    saveAll:boolean,
    preliminaryDetails: any,
    index:number
  ) => {
    var editData: Array<IPreliminaries>=[];
    let preData:Array<IPreliminariesComponentDetails>=[];
    preData.push(preliminaryDetails.preliminaryDetails[index]);
    var preliminariesData:Array<IPreliminaries>=saveAll?
    convertIntoDatabaseModel(preliminaryDetails.preliminaryDetails,paramProjectId):
    convertIntoDatabaseModel(preData,paramProjectId)
    editData=  preliminariesData.filter((data)=>{
      return (data.TotalCost>0&&data.PreliminaryId!=''&&data.GrossMargin&&data.NameOfSupplier&&data.NoOfHours);
    })
    if( editData.length>0)
    {
      props.preliminaryEdit(editData);
    }
    else
    {
      toast.error('No data changed to save.');
    }
  };

  return (
    <div className="container-fluid">
      <div className=" row">
        <div className="col-lg-12">
          <form className="customer-enquiry">
            <h1>
              Justification &amp; Authorisation
              <p className="sub_head">preliminaries</p>
            </h1>
            <div className="table-responsive">
            <PreliminarySummaryView/>
            <div><button type="button" className="active fltRght" onClick={()=>handleExpandAllEvent()}>EXPAND ALL</button></div>
            </div>
            <div>
              <PreliminaryForm
                onSave={handleSaveData}
                onToggle={handleToggle}
                preliminariesDetails={props.preliminaryDetails}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    preliminaryDetails: state.preliminary.preliminaryDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    preliminaryAdd: (preliminaryDetails) =>
      dispatch(actions.preliminaryAdd(preliminaryDetails)),
    preliminaryEdit: (preliminaryDetails) =>
      dispatch(actions.preliminaryEdit(preliminaryDetails)),
    getPreliminaryDetails: (projectId: string) =>
      dispatch(actions.getPreliminaryDetails(projectId)),
    getLookupDetails:(projectId)=>
      dispatch(actions.getLookUpDetails(projectId))

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preliminaries);
