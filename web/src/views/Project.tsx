import React from 'react';
import ProjectForm from '../components/Forms/ProjectForm/ProjectForm';
import showResults from '../components/Forms/ProjectForm/showResults';

class Project extends React.Component {
  render() {
    return <ProjectForm onSubmit={showResults} />;
  }
}

export default Project;
