import React from 'react';
import HeaderPage from '../components/HeaderPage';
import { IBtnActionProps } from '../props/AppProps';
import { createStyles, makeStyles, Theme, Paper, Typography } from '@material-ui/core';
import ProjectForm  from '../components/ProjectForm';

class Project extends React.Component {

    constructor(props: any) {
        super(props);
    }



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