import React from 'react';
import ProjectForm from '../components/Forms/ProjectForm/ProjectForm';
import showResults from '../components/Forms/ProjectForm/showResults';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import projectAddReducer from '../redux/reducers/projectAddReducer';

class Project extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ProjectForm onSubmit={showResults}></ProjectForm>
      </React.Fragment>
    );
  }
}

export default Project;
