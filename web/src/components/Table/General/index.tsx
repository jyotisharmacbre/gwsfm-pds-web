import React from 'react';
import './style.css';
import { Divider, IconButton } from '@material-ui/core';
import { Create } from '@material-ui/icons';


const GeneralTable: React.FC = () => {

    return (<React.Fragment>
        <table className={'general-table'}>
            <thead>
                <tr>
                    <th>
                        <label className="general-table-title">Header 1 <br /> <span>subtitle</span></label>

                    </th>
                    <th>
                        <label className="general-table-title">Header 2 <br /> <span>subtitle</span></label>
                    </th>
                    <th>
                        <label className="general-table-title">Header 3 <br /> <span>subtitle</span></label>
                    </th>
                    <th>
                        <label className="general-table-title">Header 4 <br /> <span>subtitle</span></label>
                    </th>
                    <th>
                        <IconButton color="primary">
                            <Create />
                        </IconButton>
                    </th>
                </tr>
                <tr>
                    <th colSpan={6}>
                        <Divider /></th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    <td>
                        Scope of Work:
                    <ul className="listitems">
                            <li>Topic 1</li>
                            <li>Topic 1</li>
                            <li>Topic 1</li>
                            <li>Topic 1</li>
                            <li>Topic 1</li>
                        </ul>
                    </td>

                </tr>

            </tbody>
        </table>
    </React.Fragment>);
}

export default GeneralTable;