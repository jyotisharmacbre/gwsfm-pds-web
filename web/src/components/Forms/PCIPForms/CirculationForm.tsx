/* istanbul ignore file */

import React from 'react';
import save from '../../../assests/images/save_icon.svg';
import checkBox from '../../../assests/images/check_box.svg';

const CirculationForm = () => {
    return (
        <div className="circulation_form_outer">
            <div className="title">
                <h3>circulation list</h3>
                <span><img src={save} alt="save" />SAVE</span>
            </div>
            <div className="table-outer">
                <table className="table_responsive">
                    <thead>
                        <tr>
                            <th>COPY NO.</th>
                            <th>ISSUED TO</th>
                            <th>COMPANY</th>
                            <th>REQUIRED</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-column="COPY NO.">1</td>
                            <td data-column="ISSUED TO">Client</td>
                            <td data-column="COMPANY">Caretown Ltd</td>
                            <td data-column="REQUIRED">
                                <div className="Checkbox">
                                    <input type="checkbox" />
                                    <div className="Checkbox-visible"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="COPY NO.">2</td>
                            <td data-column="ISSUED TO">Contractor Team</td>
                            <td data-column="COMPANY">&nbsp;</td>
                            <td data-column="REQUIRED">
                                <div className="Checkbox">
                                    <input type="checkbox" />
                                    <div className="Checkbox-visible"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="COPY NO.">3</td>
                            <td data-column="ISSUED TO">Project Manager</td>
                            <td data-column="COMPANY">George, Teen @ GWS EMEA</td>
                            <td data-column="REQUIRED">
                                <div className="Checkbox">
                                    <input type="checkbox" />
                                    <div className="Checkbox-visible"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="COPY NO.">4</td>
                            <td data-column="ISSUED TO">Architect</td>
                            <td data-column="COMPANY">&nbsp;</td>
                            <td data-column="REQUIRED">
                                <div className="Checkbox">
                                    <input type="checkbox" />
                                    <div className="Checkbox-visible"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="COPY NO.">5</td>
                            <td data-column="ISSUED TO">Mechanical & Electrical Consultants</td>
                            <td data-column="COMPANY">&nbsp;</td>
                            <td data-column="REQUIRED">
                                <div className="Checkbox">
                                    <input type="checkbox" />
                                    <div className="Checkbox-visible"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="COPY NO.">6</td>
                            <td data-column="ISSUED TO">Structural Engineers</td>
                            <td data-column="COMPANY">&nbsp;</td>
                            <td data-column="REQUIRED">
                                <div className="Checkbox">
                                    <input type="checkbox" checked />
                                    <div className="Checkbox-visible"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td data-column="COPY NO.">7</td>
                            <td data-column="ISSUED TO">Contractors</td>
                            <td data-column="COMPANY">Caretown Ltd</td>
                            <td data-column="REQUIRED">
                                <div className="Checkbox">
                                    <input type="checkbox" />
                                    <div className="Checkbox-visible"></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CirculationForm;