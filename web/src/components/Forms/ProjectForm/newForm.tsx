import React from 'react';

const ProjectContainerForm = () => {
  return (
    <div className="container-fluid">
      <div className=" row">
        <div className="col-md-8">
          <form className="customer-enquiry">
            <h1>customer enquiry</h1>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">project*</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter project name"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
