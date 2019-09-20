import React from 'react';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ProjectForm from '../components/Forms/ProjectForm/ProjectForm';

class Project extends React.Component {

    render() {

        return (
            <React.Fragment>
                <HeaderPage Title={'New Project'} />
                <ProjectForm ></ProjectForm>

            </React.Fragment>
        );
    }
}

export default Project;