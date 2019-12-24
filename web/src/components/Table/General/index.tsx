import React from 'react';
import './style.css';
import { Divider, IconButton } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { IGeneralTableProps } from './props';

const GeneralTable: React.FC<IGeneralTableProps> = props => {
  return (

    <div className="project-info-block">
      <div className="row">
        <div className="col-md-12">
          <div className="row">

            {props.headers.map(h => {
              return (
                <div className="col-xl-2 col-lg-4 col-md-6 col-6 mb-3 m-xl-0">
                  <label>{h.heading}</label>
                  <p>{h.subHeading}</p>
                </div>)
            })}

            <div className="col-xl-2 col-lg-4 col-md-6 col-6 mb-3 m-xl-0 d-flex justify-content-start justify-content-xl-end">
              <div className="d-flex justify-content-between">
                <button type="submit" className="edit-btn" onClick={props.editActionClick}>EDIT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hr"></div>
      <div className="row">
        <div className="col-lg-12">
          <div className="project-info-desc">
            <label>Project Scope</label>
            <p>
              {props.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralTable;
