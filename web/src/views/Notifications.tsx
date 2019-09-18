
import React from 'react';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import Table from '../components/Table/TestTable';

class Notifications extends React.Component {
    render() {
        return (
            <React.Fragment>
                 <HeaderPage Title={'Notifications'}  />
                 <Table IsSuperManager = {true}/>
            </React.Fragment>
        );
    }
}

export default Notifications;