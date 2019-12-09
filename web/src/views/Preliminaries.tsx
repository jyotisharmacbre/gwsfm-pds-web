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
import { ILookup } from '../store/Lookups/Types/ILookup';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import { FormattedMessage } from 'react-intl';
import EventType from '../enums/EventType';
import { generateUUID } from '../helpers/utility-helper';

interface IMapStateToProps {
  preliminaryDetails: Array<IPreliminariesComponentDetails>;
  lookupData:Array<ILookup>;
  currencies:Array<ICurrency> | null;
  match:any;
  notify: Notify;
  event: EventType;
  currencyId:number;
}
interface IMapDispatchToProps {
  preliminaryAdd: (
    preliminaryDetails: Array<IPreliminaries>,
    event: EventType
      ) => void;
  preliminaryEdit: (
    preliminaryDetails:  Array<IPreliminaries>,
    event: EventType
  ) => void;
  getPreliminaryDetails: (projectId: string) => void;
  updateInputField:(inputData:any)=>void;
  getAllCurrencies:()=>void;
  getProjectStatus: () => void;
  getProjectDetail: (projectId: string) => void;
}

const Preliminaries: React.FC<
  IMapStateToProps & IMapDispatchToProps
> = props => {
  let history = useHistory();
  let paramProjectId:string= props.match.params.projectId;
let isLookupSessionExists:boolean=(sessionStorage.getItem("lookupData")!=null&&sessionStorage.getItem("lookupData")!=undefined&&sessionStorage.getItem("lookupData")!="")
  useEffect(() => {
    window.scrollTo(0, 0);
    props.getProjectDetail(paramProjectId);
    props.getProjectStatus();
    props.getAllCurrencies();
    debugger;
    if (paramProjectId!= null &&paramProjectId != '' &&paramProjectId != undefined&&isLookupSessionExists) 
    {
      props.getPreliminaryDetails(paramProjectId);
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (props.notify == Notify.success) {
      toast.success('Data Saved Successfully');
      if (props.event == EventType.next) {
        history.push('/Subcontractor/'+paramProjectId);
      } 
      }
      else if(props.notify == Notify.error)
      {
        toast.error('Error occured.Please contact to administrator.');
      }
       
  }, [props.notify,props.event]);
  useEffect(() => {
    if(isLookupSessionExists)
      {
        props.getPreliminaryDetails(paramProjectId);
      }
  }, [props.lookupData]);
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
    event:EventType,
    preliminaryDetails: any,
    index:number
    
  ) => {
    var editData: Array<IPreliminaries>=[];
    var saveData: Array<IPreliminaries>=[];
    let preData:Array<IPreliminariesComponentDetails>=[];
    preData.push(preliminaryDetails.preliminaryDetails[index]);
    var preliminariesData:Array<IPreliminaries>=saveAll?
    convertIntoDatabaseModel(preliminaryDetails.preliminaryDetails,paramProjectId):
    convertIntoDatabaseModel(preData,paramProjectId)
    editData=  preliminariesData.filter((data)=>{
      return (data.TotalCost>0&&data.PreliminaryId!='');
    })
    saveData=  preliminariesData.filter((data)=>{
      if(data.TotalCost>0&&data.PreliminaryId=='')
      {
        data.PreliminaryId=generateUUID();
        return data;
      }
    })
    if(editData.length>0&&saveData.length>0){props.preliminaryEdit(editData,event);props.preliminaryAdd(saveData,event);}
    else if(editData.length>0){props.preliminaryEdit(editData,event);}
    else if(saveData.length>0){props.preliminaryAdd(saveData,event)}
    else{toast.error('No data changed to save.');}
  };
  const handlePrevious = ( ) => {
    history.push('/Project');
  };

  return (
    <div className="container-fluid">
      <div className=" row">
        <div className="col-lg-12">
          <form className="customer-enquiry">
            <h1>
            <FormattedMessage id="JUSTIFICATION" />
 &amp;  <FormattedMessage id="AUTHORISATION" />
              <p className="sub_head">preliminaries</p>
            </h1>
            <div className="table-responsive">
            <PreliminarySummaryView/>
            <div><button type="button" className="active fltRght" onClick={()=>handleExpandAllEvent()}>EXPAND ALL</button></div>
            </div>
            <div>
              <PreliminaryForm
                onSave={handleSaveData}
                onPrevious={handlePrevious}
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
    preliminaryDetails: state.preliminary.preliminaryDetails,
    lookupData:state.lookup.projectstatus,
    currencies:state.lookup.currencies,
    notify: state.preliminary.notify,
    currencyId:state.project.form.currencyId,
    event:state.preliminary.event
  };
};

const mapDispatchToProps = dispatch => {
  return {
    preliminaryAdd: (preliminaryDetails,event) =>
      dispatch(actions.preliminaryAdd(preliminaryDetails,event)),
    preliminaryEdit: (preliminaryDetails,event) =>
      dispatch(actions.preliminaryEdit(preliminaryDetails,event)),
      getProjectDetail: (projectId: string) =>
      dispatch(actions.getProjectDetail(projectId)),
    getPreliminaryDetails: (projectId: string) =>
      dispatch(actions.getPreliminaryDetails(projectId)),
    getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
    getProjectStatus: () => dispatch(actions.getProjectStatus())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preliminaries);
