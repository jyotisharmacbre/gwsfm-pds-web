import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';

export default function TestTable() {

    // const tableIcons = {
    //     FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    //     LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    //     NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    //   };

    return (
        <MaterialTable
        //icons={tableIcons}
        style={{ color: "#00684d", marginTop: "24px" }}
          title="Custom Filtering Algorithm Preview"
          columns={[
            {
              title: 'Name', 
              field: 'name',
              customFilterAndSearch: (term, rowData) => term == rowData.name.length
            },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'date' },
            {
              title: 'Birth Place',
              field: 'birthCity',
              lookup: { 34: 'stgsfd', 63: 'stghdf' },
            },
          ]}
          data={[
            { name: 'sdfgsds', surname: 'Baran', birthYear: new Date('07/21/1987'), birthCity: 63 },
            { name: 'asdvav', surname: 'Baran', birthYear: new Date('01/01/2017'), birthCity: 34 },
            { name: 'fhjfhgd', surname: 'Baran', birthYear: new Date('01/30/2016'), birthCity: 34 },
            { name: 'ffsdfgsds', surname: 'Baran', birthYear: new Date('07/21/1987'), birthCity: 63 },
            { name: 'hdasdvav', surname: 'Baran', birthYear: new Date('01/01/2017'), birthCity: 34 },
            { name: 'fyttrsdhjfhgd', surname: 'Baran', birthYear: new Date('01/30/2016'), birthCity: 34 },
          ]}
          options={{
            filtering: false,
            search: false,
            //paging: false
          }}
        />
      )
}