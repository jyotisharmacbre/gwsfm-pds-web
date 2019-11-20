import React from 'react';
import ProjectForm from '../components/Forms/ProjectForm/ProjectForm';
import showResults from '../components/Forms/ProjectForm/showResults';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import * as actions from '../store/actions';
import { ILookup } from '../store/Lookups/Types/ILookup';
interface IMapDispatchToProps {
  getProjectStatus: () => void;
}

interface IMapStateToProps {
  projectStatus: Array<ILookup>;
}
class Project extends React.Component<IMapDispatchToProps & IMapStateToProps> {
  componentDidMount() {
    debugger;
    this.props.getProjectStatus();
  }

  render() {
    return <ProjectForm projectstatus={this.props.projectStatus} />;
  }
}

const mapStateToProps = (state: IState) => {
  return {
    projectStatus: state.lookup.projectstatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectStatus: () => dispatch(actions.getProjectStatus())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
