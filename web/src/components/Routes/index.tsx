import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../views/Dashboard';
import Pipeline from '../../views/Pipeline';
import Project from '../../views/Project';
import Notifications from '../../views/Notifications';
import ProjectOverview from '../../views/ProjectOverview';
import JustificationAuthorisation from '../../views/JustificationAuthorisation';

const Routes: React.FC = props => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/Pipeline" component={Pipeline} />
      <Route path="/Project" component={Project} />
      <Route path="/Notifications" component={Notifications} />
      <Route path="/ProjectOverview" component={ProjectOverview} />
      <Route
        path="/JustificationAuthorisation"
        component={JustificationAuthorisation}
      />
    </Switch>
  );
};

export default Routes;
