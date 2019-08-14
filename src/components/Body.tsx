import React from 'react';
import Container from '@material-ui/core/Container';
import { IAppProps } from '../props/AppProps';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { MainTitle } from './Title';
import PageActions from './BtnActions';
import Footer from '../components/Footer';


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
                    

                </Container>
                <Footer/>
            </main>



        );
    }


}

export default Body;