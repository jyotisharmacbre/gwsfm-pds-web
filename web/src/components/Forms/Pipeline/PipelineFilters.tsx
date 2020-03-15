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
import DatePicker from '../../DatePicker';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import { Validate } from '../../../helpers/fieldValidations';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';

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

                <div className={`${showFilter ? 'filters_outer' : 'filters_outer p-0'}`}>
                    <div className="top_Title justify-content-between d-flex">
                        <h2>Pipeline View</h2>
                        <span>
                            <button
                                type="button"
                                className={`${showFilter ? 'active' : ''}`}
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                <span className="d-lg-inline d-none">Pipeline Filters</span>
                                <i>
                                    <FontAwesomeIcon className="" icon={faFilter} />
                                </i>
                            </button>
                        </span>
                    </div>
                
                    <div className={`filters_inner form_style  ${showFilter ? 'active' : 'deactive'}`}>
                        <div className="row">
                            <div className="col-lg-3 pr-lg-0">
                                <div className="inner_content">
                                    <div className="form-group">
                                        <Field
                                            name="projectAdditionalDetail.mainContractor"
                                            type="text"
                                            component={PdsFormInput}
                                            validate={[Validate.required('LABEL_MAIN_CONTRACTOR')]}
                                            labelKey="Project ID"
                                            placeholderKey="Enter project id"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field
                                            name="projectAdditionalDetail.mainContractor"
                                            type="text"
                                            component={PdsFormInput}
                                            validate={[Validate.required('LABEL_MAIN_CONTRACTOR')]}
                                            labelKey="Project Name"
                                            placeholderKey="Enter project name"
                                        />
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-3 px-lg-0">
                                <div className="inner_content">
                                    <div className="form-group">
                                        <label>Status</label>
                                        <div className="select-wrapper">
                                            <Field
                                                name="projectAdditionalDetail.workTypeId"
                                                component={PdsFormSelect}
                                                className="required"
                                                validate={[Validate.required('MESSAGE_WORK_TYPE')]}
                                                placeholderKey="PLACEHOLDER_WORK_TYPES"
                                                messageKey="MESSAGE_WORK_TYPE"
                                            >
                                                <select className="form-control w-100  undefined" name="divisionId">
                                                    <option value="">Select status</option>
                                                </select>
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 px-lg-0">
                                <div className="inner_content">
                                    <div className="form-group">
                                        <label>Last Updated</label>
                                        <div className="cal_icon">
                                            <div className="col-md-12 position-relative manipulate-calendar p-0">
                                                <DatePicker
                                                    name="projectStartDate"
                                                    data-test="projectStartDate"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 pl-lg-0">
                                <div className="inner_content">
                                    <div className="form-group range-date">
                                        <label className="d-block">Project Start Date</label>
                                        <div className="cal_icon">
                                        <label>From</label>
                                            <div className="col-md-12 position-relative manipulate-calendar p-0">
                                                <DatePicker
                                                    name="projectStartDate"
                                                    data-test="projectStartDate"
                                                />
                                            </div>
                                        </div>

                                        <div className="cal_icon">
                                            <label>To</label>
                                            <div className="col-md-12 position-relative manipulate-calendar p-0">
                                                <DatePicker
                                                    name="projectStartDate"
                                                    data-test="projectStartDate"
                                                />
                                            </div>
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
