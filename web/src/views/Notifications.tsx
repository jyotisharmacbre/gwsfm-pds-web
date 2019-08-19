import React from 'react';
import HeaderPage from '../components/HeaderPage';
import Table from '../components/Table';

class Notifications extends React.Component {

    constructor(props: any) {
        super(props);
    }


    render() {
        return (
            <React.Fragment>
                 <HeaderPage Title={'Notifications'}  />
                 <Table/>
            </React.Fragment>
        );
    }
}

export default Notifications;