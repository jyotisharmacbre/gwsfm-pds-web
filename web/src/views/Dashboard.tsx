import { Grid } from '@material-ui/core';
import React from 'react';
import { injectIntl } from 'react-intl';
import CardContainer from '../components/CardContainer/CardContainer';
import MultipleChart from '../components/Charts/MultipleCharts';
import PreferredChart from '../components/Charts/PreferredChart';
import RunRateChart from '../components/Charts/RunRateChart';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import Table from '../components/Table/Simple/Table';
import { IBtnActionProps } from '../props/AppProps';
import IReactIntl from '../Translations/IReactIntl';
import Translate from '../Translations/translate';

class Dashboard extends React.Component<IReactIntl> {
  constructor(props: any) {
    super(props);
  }

  GetButtons() {
    const action1: IBtnActionProps = {
      Title: 'Create A New Project',
      Icon: 'create',
      Color: 'primary',
      HandleClick: () => {
        window.location.href = '/Project';
      }
    };
    const action2: IBtnActionProps = {
      Title: 'Pipeline',
      Icon: 'pipeline',
      Color: 'secondary',
      HandleClick: () => {
        window.location.href = '/Pipeline';
      }
    };
    return [action1, action2];
  }

  viewAll: IBtnActionProps = {
    Title: 'View All',
    Icon: '',
    Color: 'secondary',
    HandleClick: () => {
      window.location.href = '/Pipeline';
    }
  };

  createTableColumns() {
    return [
      {
        title: 'Name',
        field: 'name',
        customFilterAndSearch: (term: any, rowData: any) =>
          term == rowData.name.length
      },
      { title: 'Updated By', field: 'updatedby' },
      { title: 'Date', field: 'date', type: 'date' },
      {
        title: 'Status',
        field: 'status',
        lookup: { 1: 'Draft', 2: 'Submitted', 3: 'Completed' }
      }
    ];
  }

  getTableData() {
    return [
      {
        name: 'Russel street road works',
        updatedby: 'Stacy Salter',
        date: new Date('07/21/1987'),
        status: 1
      },
      {
        name: 'London Bridge aqueduct planning',
        updatedby: 'Hame Moore',
        date: new Date('07/21/1987'),
        status: 1
      },
      {
        name: '51 Southwark street refilling',
        updatedby: 'Lucy Benner',
        date: new Date('07/21/1987'),
        status: 2
      },
      {
        name: 'Church street reviewing',
        updatedby: 'Imran Khan',
        date: new Date('07/21/1987'),
        status: 3
      },
      {
        name: 'Russel street road works',
        updatedby: 'Jacy Lue',
        date: new Date('07/21/1987'),
        status: 1
      },
      {
        name: 'Gregory Nash approval',
        updatedby: 'Stirlin Archer',
        date: new Date('07/21/1987'),
        status: 3
      }
    ];
  }
  render() {
    return (
      <React.Fragment>
        <HeaderPage
          Title={Translate.getLabel(this.props, 'overview')}
          ActionList={this.GetButtons()}
        />
        <CardContainer Title={Translate.getLabel(this.props, 'yourProject')}>
          <Table
            columns={this.createTableColumns()}
            data={this.getTableData()}
            ActionList={[this.viewAll]}
          />
        </CardContainer>
        <Grid container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} lg={6} md={6}>
              <CardContainer
                Title={Translate.getLabel(this.props, 'preferred')}
              >
                <PreferredChart Preferred={4} NotPreferred={6} />
              </CardContainer>
            </Grid>
            <Grid item xs={12} sm={12} lg={6} md={6}>
              <CardContainer Title={Translate.getLabel(this.props, 'runRate')}>
                <RunRateChart
                  ICE={56}
                  JandA={12}
                  BidSubmitted={30}
                  OrderReceived={20}
                  InProgress={24}
                  Completed={20}
                />
              </CardContainer>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} lg={12} md={12}>
              <CardContainer
                Title={Translate.getLabel(this.props, 'analytics')}
              >
                <MultipleChart
                  ProjectTotal={200}
                  ICE={50}
                  Rejected={60}
                  JandA={49}
                  LostProjects={30}
                  OrderReceived={20}
                  OnHoldProject={15}
                  InProgress={24}
                  Completed={20}
                />
              </CardContainer>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default injectIntl(Dashboard);
