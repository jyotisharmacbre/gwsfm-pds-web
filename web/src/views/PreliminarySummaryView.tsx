import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import Notify from '../enums/Notify';
import { useHistory } from 'react-router-dom';
import * as actions from '../store/rootActions';
import PreliminaryForm from '../components/Forms/PreliminaryForm/PreliminaryForm';

interface IMapStateToProps {

}
interface IMapDispatchToProps {
  
}

const PreliminarySummaryView: React.FC<
  IMapStateToProps & IMapDispatchToProps
> = props => {
  let history = useHistory();


  return (
    
            
              <table className="price-sumry table table-bordered cost fltLeft">
                <thead>
                  <tr>
                    <th>Total Cost</th>
                    <th>Total Margin</th>
                    <th>Gross Margin</th>
                    <th>Total Sell</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&pound;36,00.00</td>
                    <td>25%</td>
                    <td>&pound;40,00.00</td>
                    <td>&pound;40,00.00</td>
                  </tr>
                </tbody>
              </table>
  );
};

const mapStateToProps = (state: IState) => {
  return {
   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreliminarySummaryView);
