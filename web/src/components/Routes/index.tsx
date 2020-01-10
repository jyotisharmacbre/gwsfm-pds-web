import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../views/Dashboard';
import Pipeline from '../../views/Pipeline';
import Project from '../../views/Project';
import Notifications from '../../views/Notifications';
import ProjectOverview from '../../views/ProjectOverview';
import JustificationAuthorisation from '../../views/JustificationAuthorisation';
import Discounts from '../../views/Discounts';
import Subcontractor from '../../views/Subcontractor';
import ReviewSubmit from '../../views/ReviewSubmit';
import ReviewApprove from '../../views/ReviewApprove';
const Preliminaries=React.lazy(()=>import('../../views/Preliminaries'))
const Routes: React.FC = props => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/Pipeline" component={Pipeline} />
      <Route path="/Project/:projectId?" component={Project} />
      <Route path="/Notifications" component={Notifications} />
      <Route path="/ProjectOverview/:projectId" component={ProjectOverview} />
      <Route path="/Discounts/:projectId" component={Discounts} />
      <Route path="/Subcontractor/:projectId" component={Subcontractor} />
      <Route
        path="/JustificationAuthorisation/:projectId"
        component={JustificationAuthorisation}
      />
      <Suspense fallback={<div>Loading...</div>}><Route path="/Preliminaries/:projectId" component={Preliminaries} /></Suspense>
      <Route path="/Subcontractor/:projectId" component={Subcontractor} />
      <Route path="/ReviewSubmit/:projectId" component={ReviewSubmit} />
      <Route path="/ReviewApprove/:projectId" component={ReviewApprove} />
    </Switch>
  );
};

export default Routes;
