import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../views/Dashboard';
import Pipeline from '../../views/Pipeline';
import Project from '../../views/Project';
import Notifications from '../../views/Notifications';
import ProjectOverview from '../../views/ProjectOverview';
import JustificationAuthorisation from '../../views/JustificationAuthorisation';
import Discounts from '../../views/Discounts';
import Subcontractor from '../../views/Subcontractor';

import Preliminaries from '../../views/Preliminaries';
const Routes: React.FC = props => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/Pipeline" component={Pipeline} />
      <Route path="/Project" component={Project} />
      <Route path="/Notifications" component={Notifications} />
      <Route path="/ProjectOverview/:projectId" component={ProjectOverview} />
      <Route path="/Discounts" component={Discounts} />
      <Route path="/Subcontractor" component={Subcontractor} />
      <Route
        path="/JustificationAuthorisation"
        component={JustificationAuthorisation}
      />
      <Route path="/Preliminaries" component={Preliminaries} />
    </Switch>
  );
};

export default Routes;
