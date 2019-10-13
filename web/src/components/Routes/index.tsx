import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../../views/Dashboard';
import Pipeline from '../../views/Pipeline';
import Project from '../../views/Project';
import Notifications from '../../views/Notifications';
import ProjectOverview from '../../views/ProjectOverview';

const Routes: React.FC = (props) => {
    return (<Router>
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/Pipeline" component={Pipeline} />
            <Route exact path="/Project" component={Project} />
            <Route exact path="/Notifications" component={Notifications} />
            <Route exact path="/ProjectOverview" component={ProjectOverview} />
        </Switch>
    </Router>);
}

export default Routes;