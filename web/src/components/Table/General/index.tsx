import React from 'react';
import './style.css';
import { Divider, IconButton } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { IGeneralTableProps } from './props';


const GeneralTable: React.FC<IGeneralTableProps> = (props) => {

    return (<React.Fragment>
        <table className={'general-table'}>
            <thead>
                <tr>
                    {props.headers.map(h => {
                        return (
                            <th key={h.heading}>
                                <label className="general-table-title">{h.heading}<br /> <span>{h.subHeading}</span></label>
                            </th>
                        );
                    })}
                    <th>
                        <IconButton color="primary" onClick={props.editActionClick}>
                            <Create />
                        </IconButton>
                    </th>
                </tr>
                <tr>
                    <th colSpan={props.headers.length + 1}>
                        <Divider /></th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    <td>
                        Scope of Work:
                    <ul className="listitems">
                            <li>{props.content}</li>
                        </ul>
                    </td>

                </tr>

            </tbody>
        </table>
    </React.Fragment>);
}

export default GeneralTable;