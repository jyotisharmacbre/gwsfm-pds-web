import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import SubcontractorForm from '../components/Forms/Subcontractor/SubcontractorForm';
import { ISubContractor } from '../store/SubContractor/Types/ISubContractor';
import * as actions from '../store/rootActions';
import { IState } from '../store/state';


interface IProps {} 

interface IMapStateToProps {
  form:ISubContractor;
}

interface IMapDispatchToProps {
  addNewActivity: () => void;
  deleteActivity:(index:number) => void;
}

const Subcontractor: React.FC<IProps & IMapStateToProps & IMapDispatchToProps> = props => {
  const handlePrevious = (data: ISubContractor) => {
    console.log('Data');
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="custom-wrap">
              <div className="heading-subtitle">
                <h1>
                  <span className="d-md-block d-none">
                    Justification &amp; Authorisation
                  </span>
                  <span className="d-md-none">J&amp;A</span>
                </h1>
                <p className="text-green">SUBCONTRACTORS</p>
              </div>
            <SubcontractorForm
              onSave={handlePrevious}
              onNext={handlePrevious}
              onPrevious={handlePrevious}
              addNewActivity={props.addNewActivity}
              deleteActivity={props.deleteActivity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  form: state.subContractor.form
});

const mapDispatchToProps = dispatch => {
  return {
    addNewActivity: () => dispatch(actions.addNewActivity()),
    deleteActivity:(index:number) => dispatch(actions.deleteActivity(index))
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subcontractor);
