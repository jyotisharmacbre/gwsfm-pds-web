import React from 'react';
import HeaderPage from '../components/HeaderPage';
import ProjectsTable from '../components/ProjectsTable';
//import DatePicker from '../components/DatePicker';

class Dashboard extends React.Component {
    render() {
        return (
            <React.Fragment>
                 <HeaderPage Title={'Pipeline'}  />
                 {/* <div>Select dates: from <DatePicker /> to <DatePicker /></div> */}
                 <ProjectsTable />
            </React.Fragment>
        );
    }
}

export default Dashboard;