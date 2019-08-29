import React from 'react';
import HeaderPage from '../components/HeaderPage';
import ProjectsTable from '../components/ProjectsTable';
//import DatePicker from '../components/DatePicker';
import TestTable from '../components/TestTable'
import Filters from '../components/Filters'

class Dashboard extends React.Component {
    render() {
        return (
            <React.Fragment>
                 <HeaderPage Title={'Pipeline'}  />
                 {/* <div>Select dates: from <DatePicker /> to <DatePicker /></div> */}
                 <Filters />
                <TestTable />
                 <ProjectsTable />
            </React.Fragment>
        );
    }
}

export default Dashboard;