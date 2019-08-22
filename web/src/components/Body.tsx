import React from 'react';
import Container from '@material-ui/core/Container';
import { IAppProps } from '../props/AppProps';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from '../components/Footer';
import Dashboard from '../views/Dashboard';
import Pipeline from '../views/Pipeline';
import Project from '../views/Project';


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
                        </Switch>
                  
                </Container>
                <Footer />
                </Router>
            </main>

        );
    }


}

export default Body;