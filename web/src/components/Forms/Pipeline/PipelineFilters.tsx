import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import IPipelineFilters from '../../../models/IPipelineFilters';
import IFilterParams from '../../../models/tableQueryParams/IFilterParams';
import IReactIntl from '../../../Translations/IReactIntl';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import cal from '../../assests/images/calender.svg';
import cal2 from '../../assests/images/focus_calander.svg';

interface IProps {
    onApplyFilter: (data: IFilterParams) => void;
}

const PipelineFilters: React.FC<IProps & IReactIntl & InjectedFormProps<IPipelineFilters, IProps>>
    = (props) => {
        const [showFilter, setShowFilter] = useState(false);

        const createFilterData = (piplineFilterData: IPipelineFilters) => {
            console.log(piplineFilterData);
            const filterData = {} as IFilterParams;
            props.onApplyFilter(filterData);
        }

        const reset = () => {

        }

        return (
            <form className="custom-wrap p-0" onSubmit={props.handleSubmit} noValidate={true}>

                <div className="filters_outer">
                    <div className="top_Title justify-content-between d-flex">
                        <h2>Pipeline View</h2>
                        <span>
                            <button
                                className="active"
                                type="button"
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                Pipeline Filters
                                        <i>
                                    <FontAwesomeIcon className="" icon={faFilter} />
                                </i>
                            </button>
                        </span>
                    </div>
                    <div className={`filters_inner form_style  ${showFilter ? 'show' : 'hide'}`}>
                        <div className="row">
                            <div className="col-lg-4 pr-0">
                                <div className="inner_content">
                                    <div className="form-group">
                                        <label>Project ID</label>
                                        <input name="name" placeholder="Enter project id" type="text" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Project Name</label>
                                        <input name="name" placeholder="Enter project name" type="text" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Owner</label>
                                        <input name="name" placeholder="Add the name of.." type="text" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>CLient/Customer</label>
                                        <input name="name" placeholder="Add the name of.." type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 px-0">
                                <div className="inner_content">
                                    <div className="form-group">
                                        <label>Last Updated</label>
                                        <div className="cal_icon">
                                            <input name="name" placeholder="DD/MM/YYYY" type="text" className="form-control" />
                                            {/* <img src={cal} /> */}
                                        </div>
                                    </div>
                                    <div className="form-group range-date">
                                        <label className="d-block">Project Start Date</label>
                                        <div className="cal_icon">
                                            <input name="name" placeholder="From" type="text" className="form-control" />
                                            {/* <img src={cal} /> */}
                                        </div>
                                        <div className="cal_icon">
                                            <input name="name" placeholder="To" type="text" className="form-control" />
                                            {/* <img src={cal} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 pl-0">
                                <div className="inner_content">
                                    <div className="form-group">
                                        <label>Status</label>
                                        <div className="select-wrapper">
                                            <select className="form-control w-100  undefined" name="divisionId">
                                                <option value="">Select status</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mr-35 two-side-btn">
                            <button className="active ml-auto" type="button">CLEAR ALL</button>
                            <button type="button" name="next">APPLY</button></div>
                    </div>
                </div>

            </form>
        );
    };


const form = reduxForm<IPipelineFilters, IProps>({
    form: 'PipelineFilters',
    enableReinitialize: true,
})(injectIntl(PipelineFilters));


export default connect()(form);
