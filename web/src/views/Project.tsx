import React from 'react';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ProjectForm from '../components/Forms/ProjectForm/ProjectForm';
import { Container } from '@material-ui/core';

class Project extends React.Component {

    render() {

        return (
            <React.Fragment>
                <Container component="main" >
                    <HeaderPage Title={'New Project'} />
                    <ProjectForm ></ProjectForm>
                </Container>
            </React.Fragment >
        );
    }
}

export default Project;