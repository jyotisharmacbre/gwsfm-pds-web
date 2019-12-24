import React, { Component } from 'react';

class ProjectOverviewGrid extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="price-sumry">
                        <label>Pricing Summary</label>
                        <div className="inner-block">
                            <table className="price-table">
                                <thead>
                                    <tr>
                                        <th>k</th>
                                        <th>Cost (&#163;)</th>
                                        <th>Margin (%)</th>
                                        <th>Sell (&#163;)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Preliminaries</td>
                                        <td>&#163;12,000.00</td>
                                        <td>0 (%)</td>
                                        <td>&#163;12,000.00</td>
                                    </tr>
                                    <tr>
                                        <td>Subcontractors</td>
                                        <td>&#163;12,000.00</td>
                                        <td>0 (%)</td>
                                        <td>&#163;12,000.00</td>
                                    </tr>
                                    <tr>
                                        <td>Discounts</td>
                                        <td>&#163;12,000.00</td>
                                        <td>25 (%)</td>
                                        <td>&#163;16,000.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="inner-block">
                            <table className="price-table">
                                <thead>
                                    <tr>
                                        <th>Disount</th>
                                        <th>Sub-Contractor</th>
                                        <th>Null</th>
                                        <th>Customer (% if selected)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>&#163;1000</td>
                                        <td>&#163;1000</td>
                                        <td>&#163;1000</td>
                                        <td>&#163;1000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectOverviewGrid;