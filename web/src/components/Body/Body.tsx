import React from 'react';
import Container from '@material-ui/core/Container';
import { IAppProps } from '../../props/AppProps';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Dashboard from '../../views/Dashboard';
import Pipeline from '../../views/Pipeline';
import Project from '../../views/Project';
import Notifications from '../../views/Notifications';


class Body extends React.Component<IAppProps> {

    render() {
        const { UseStyles } = this.props;

        return (
            <main className={UseStyles.content}>
                <Router>
                    <div className={UseStyles.appBarSpacer} />
                    <Container maxWidth="lg" className={UseStyles.container}>

                        <Switch>
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/Pipeline" component={Pipeline} />
                            <Route exact path="/Project" component={Project} />
                            <Route exact path="/Notifications" component={Notifications} />
                        </Switch>

                    </Container>
                    <Footer />
                </Router>
            </main>

        );
    }


}

export default Body;