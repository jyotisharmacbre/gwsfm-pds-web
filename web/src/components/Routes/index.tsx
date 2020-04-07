/* istanbul ignore file */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../views/Dashboard';
import Pipeline from '../../views/Pipeline';
import Project from '../../views/Project';
import ProjectOverview from '../../views/ProjectOverview';
import JustificationAuthorisation from '../../views/JustificationAuthorisation';
import Discounts from '../../views/Discounts';
import Subcontractor from '../../views/Subcontractor';
import ReviewSubmit from '../../views/ReviewSubmit';
import ReviewApprove from '../../views/ReviewApprove';
import ProfileMenu from '../Menu/ProfileMenu/ProfileMenu';
import Nav from '../Nav/Nav';
import Preliminaries from '../../views/Preliminaries';
import Error from '../../views/Error/Error';
import Setup from '../../views/PCIP/Setup';
import Summary from '../../views/PCIP/Summary';
import TableContent from '../../views/PCIP/TableContent';

const NavRoute = ({ component: Component, showLeftMenu, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <React.Fragment>
        {showLeftMenu && <Nav />}
        <div id="content">
          <ProfileMenu />
          <Component {...props} />
        </div>
      </React.Fragment>)}>
    </Route>
  )
}

const Routes: React.FC = props => {
  return (
    <Switch>
      <NavRoute exact path="/" component={Dashboard} showLeftMenu={false} />
      <NavRoute path="/Pipeline" component={Pipeline} showLeftMenu={false} />
      <NavRoute path="/Project/:projectId?" component={Project} showLeftMenu={true} />
      <NavRoute path="/ProjectOverview/:projectId" component={ProjectOverview} showLeftMenu={true} />
      <NavRoute path="/Discounts/:projectId" component={Discounts} showLeftMenu={true} />
      <NavRoute path="/Subcontractor/:projectId" component={Subcontractor} showLeftMenu={true} />
      <NavRoute
        path="/JustificationAuthorisation/:projectId"
        component={JustificationAuthorisation}
        showLeftMenu={true}
      />
      <NavRoute path="/Preliminaries/:projectId" component={Preliminaries} showLeftMenu={true} />
      <NavRoute path="/Subcontractor/:projectId" component={Subcontractor} showLeftMenu={true} />
      <NavRoute path="/ReviewSubmit/:projectId" component={ReviewSubmit} showLeftMenu={true} />
      <NavRoute path="/ReviewApprove/:projectId" component={ReviewApprove} showLeftMenu={true} />
      <NavRoute path="/Setup/:projectId" component={Setup} showLeftMenu={true} />
      <NavRoute path="/Summary/:projectId" component={Summary} showLeftMenu={true} />
      <NavRoute path="/TableContent/:projectId" component={TableContent} showLeftMenu={true} />
      <Route path="/Error" component={Error} />
    </Switch>
  );
};

export default Routes;