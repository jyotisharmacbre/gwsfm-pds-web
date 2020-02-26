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
import ReviewSubmit from '../../views/ReviewSubmit';
import ReviewApprove from '../../views/ReviewApprove';
//import Error from '../../views/Error/Error';
import ProfileMenu from '../Menu/ProfileMenu/ProfileMenu';
import Nav from '../Nav/Nav';
import Preliminaries from '../../views/Preliminaries';
const Error = React.lazy(() => import('../../views/Error/Error'))

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
            <Route path="/Notifications" component={Notifications} />
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
            <Route path="/Error" component={Error} />
        </Switch>
    );
};

export default Routes;