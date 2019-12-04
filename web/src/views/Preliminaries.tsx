import React, { useEffect } from 'react';
import '../components/Forms/PreliminaryForm/all.css';
import '../components/Forms/PreliminaryForm/customSelect.css';
import '../components/Forms/PreliminaryForm/style.css';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import Notify from '../enums/Notify';
import { useHistory } from 'react-router-dom';
import * as actions from '../store/rootActions';
import PreliminaryForm from '../components/Forms/PreliminaryForm/PreliminaryForm';
import PreliminarySummaryView from "./PreliminarySummaryView";
import { IPreliminaryState } from '../store/Preliminaries/Types/IPreliminaryState';
interface IMapStateToProps {
  preliminaryDetails: Array<IPreliminariesComponentDetails>;
  projectId: string;
  isVisible: boolean;
  notify: Notify;
}
interface IMapDispatchToProps {
  preliminaryAdd: (
    preliminaryDetails: IPreliminaryState
  ) => void;
  preliminaryEdit: (
    preliminaryDetails: IPreliminaryState
  ) => void;
  getPreliminaryDetails: (projectId: string) => void;
  updateInputField:(inputData:any)=>void;
}

const Preliminaries: React.FC<
  IMapStateToProps & IMapDispatchToProps
> = props => {
  let history = useHistory();
  useEffect(() => {
    if (
      props.projectId != null &&
      props.projectId != '' &&
      props.projectId != undefined
    ) {
      props.getPreliminaryDetails(props.projectId);
    }
  }, []);
  const handleExpandAllEvent = () => {
    var element: any = document.getElementsByClassName('expandAll');
    for(let i=0;i<element.length;i++)
    {
      element[i].classList.remove('hide');
      element[i].classList.add('show');
    }
  };
  const handleSaveData = (
    preliminaryDetails: IPreliminariesComponentDetails,
    saveAll:boolean
  ) => {
    var saveFlag:boolean=false;
    var saveData: IPreliminaryState={projectId:"",preliminaryDetails:[]} ;
    var editData: IPreliminaryState={projectId:"",preliminaryDetails:[]} ;
    if(saveAll)
    {
      editData.preliminaryDetails=  props.preliminaryDetails.filter((data)=>{
        
          return data.items.map((itemData)=>itemData.totalCost>0&&itemData.preliminaryId!='');
        })
      saveData.preliminaryDetails= props.preliminaryDetails.filter((data)=>{
              return data.items.map((itemData)=>itemData.totalCost>0);
         })
    }
    else
    {
      preliminaryDetails.items.map((data)=>data.preliminaryId!=''?saveFlag=false:saveFlag=true);
      saveFlag?saveData.preliminaryDetails.push(preliminaryDetails):editData.preliminaryDetails.push(preliminaryDetails);
      
    }
    if(editData.preliminaryDetails.length>0&&saveData.preliminaryDetails.length>0)
    {
      props.preliminaryAdd(saveData);
      props.preliminaryEdit(editData);
    }
    else
    {
      editData.preliminaryDetails.length>0?props.preliminaryEdit(editData):props.preliminaryAdd(saveData)

    }
    
  };
  useEffect(() => {
    if (props.notify == Notify.success) {
    }
  }, [props.notify]);

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
                preliminariesDetails={props.preliminaryDetails}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="ml-35 mb-4 js-btn3">
        <div className="row">
          <div className="col-4">
            {' '}
            <button type="button" className="active mb-4 mt-5" onClick={()=>handleSaveData(props.preliminaryDetails[0],true)}>
              PREVIOUS
            </button>
          </div>
          <div className="col-8 text-right">
            <button type="button" className="active mb-4 mt-5  text-right" onClick={()=>handleSaveData(props.preliminaryDetails[0],true)}>>
              SAVE
            </button>
            <button type="button" className="mb-4 mt-5 text-right" onClick={()=>handleSaveData(props.preliminaryDetails[0],true)}>>
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    preliminaryDetails: state.preliminary.preliminaryDetails,
    projectId: state.preliminary.projectId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    preliminaryAdd: (preliminaryDetails) =>
      dispatch(actions.preliminaryAdd(preliminaryDetails)),
    preliminaryEdit: (preliminaryDetails) =>
      dispatch(actions.preliminaryEdit(preliminaryDetails)),
    getPreliminaryDetails: (projectId: string) =>
      dispatch(actions.getPreliminaryDetails(projectId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preliminaries);
