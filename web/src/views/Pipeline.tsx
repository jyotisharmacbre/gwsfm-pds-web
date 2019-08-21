import React from 'react';
import HeaderPage from '../components/HeaderPage';

class Dashboard extends React.Component {

    constructor(props: any) {
        super(props);
    }


    render() {
        return (
            <React.Fragment>
                 <HeaderPage Title={'Pipeline'}  />
            </React.Fragment>
        );
    }
}

export default Dashboard;