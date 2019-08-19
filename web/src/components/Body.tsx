import React from 'react';
import Container from '@material-ui/core/Container';
import { IAppProps } from '../props/AppProps';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { MainTitle } from './Title';
import PageActions from './BtnActions';
import Footer from '../components/Footer';
import {IntlProvider} from "react-intl";
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';


class Body extends React.Component<IAppProps> {

    constructor(props: IAppProps) {
        super(props);
    }

    GetButtons() {
        return ([
            { Title: 'Create A New Project' }]
        );
    }

    render() {
        const { UseStyles } = this.props;

        return (
            <main className={UseStyles.content}>
                <div className={UseStyles.appBarSpacer} />
                <Container maxWidth="lg" className={UseStyles.container}>
                    <p>Hello World</p>
                    <p>
    <FormattedHTMLMessage id="app.text"
                      defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                      description="Welcome header on app main page"
                      values={{ what: 'react-intl' }}/>
</p>
<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
    <FormattedMessage id="app.learn-react-link"
                      defaultMessage="Learn React"
                      description="Link on react page"/>
</a>
                </Container>
                <Footer/>
            </main>



        );
    }


}

export default Body;