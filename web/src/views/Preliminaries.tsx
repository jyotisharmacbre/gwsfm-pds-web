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

interface IMapStateToProps {
  preliminaryDetails: Array<IPreliminariesComponentDetails>;
  projectId: string;
  isVisible: boolean;
  notify: Notify;
}
interface IMapDispatchToProps {
  preliminaryAdd: (
    projectId: string,
    preliminaryDetails: Array<IPreliminariesComponentDetails>
  ) => void;
  preliminaryEdit: (
    projectId: string,
    preliminaryDetails: Array<IPreliminariesComponentDetails>
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
    projectId: string,
    preliminaryDetails: IPreliminariesComponentDetails,
    saveAll:boolean
  ) => {
    var filterData: IPreliminariesComponentDetails[] = [];
    
    if(saveAll)
    {
      filterData=  props.preliminaryDetails.filter((data)=>{
return data.items.map((itemData)=>itemData.totalCost>0);
      })
    }
    else
    {
      filterData.push(preliminaryDetails);
    }
    props.preliminaryAdd(projectId, filterData);
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
              <table className="table table-bordered cost fltLeft">
                <thead>
                  <tr>
                    <th>Total Cost</th>
                    <th>Total Margin</th>
                    <th>Gross Margin</th>
                    <th>Total Sell</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&pound;36,00.00</td>
                    <td>25%</td>
                    <td>&pound;40,00.00</td>
                    <td>&pound;40,00.00</td>
                  </tr>
                </tbody>
              </table>
              <div onClick={() => handleExpandAllEvent()} className="fltRght"><button type="button" className="active">EXPAND ALL</button></div>

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
            <button type="submit" className="active mb-4 mt-5">
              PREVIOUS
            </button>
          </div>
          <div className="col-8 text-right">
            <button type="submit" className="active mb-4 mt-5  text-right">
              SAVE
            </button>
            <button type="submit" className="mb-4 mt-5 text-right">
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
    notify: state.preliminary.notify,
    projectId: state.preliminary.projectId,
    isVisible: state.preliminary.isVisible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    preliminaryAdd: (projectId, preliminaryDetails) =>
      dispatch(actions.preliminaryAdd(projectId, preliminaryDetails)),
    preliminaryEdit: (projectId, preliminaryDetails) =>
      dispatch(actions.preliminaryEdit(projectId, preliminaryDetails)),
    getPreliminaryDetails: (projectId: string) =>
      dispatch(actions.getPreliminaryDetails(projectId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preliminaries);
