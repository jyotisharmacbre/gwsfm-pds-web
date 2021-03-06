import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import PipelineFilterType from '../../../enums/PipelineFilterType';
import { getDropdown, normalizeToNumber } from '../../../helpers/utility-helper';
import IPipelineFilters from '../../../models/IPipelineFilters';
import IFilterParams from '../../../models/tableQueryParams/IFilterParams';
import { ILookup } from '../../../store/Lookups/Types/ILookup';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import IReactIntl from '../../../Translations/IReactIntl';
import DatePicker from '../../DatePicker';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import { CircularProgress } from '@material-ui/core';

interface IProps {
    onApplyFilter: (filterParamsList: Array<IFilterParams>) => void;
    lookupValues: Array<ILookup>;
    applyFilterLoader: boolean;
}

const ProjectPipelineFilters: React.FC<IProps & IReactIntl & InjectedFormProps<IPipelineFilters, IProps>> =
    (props) => {
        const [showFilter, setShowFilter] = useState(false);

        const createFilterData = (piplineFilterData?: IPipelineFilters) => {
            const filterParamsList = [] as Array<IFilterParams>;

            for (var type in PipelineFilterType) {
                if (piplineFilterData && piplineFilterData[type]) {
                    filterParamsList.push({
                        filterName: type,
                        filterValue: piplineFilterData[type]
                    })
                }
            }
            props.onApplyFilter(filterParamsList);
        }

        const clearAll = () => {
            props.reset();
            resetDates();
            createFilterData();
        }
        const resetDates = () => {
            window['projectStartDate'].reset();
            window['projectEndDate'].reset();
        };

        return (
            <form className="custom-wrap p-0" onSubmit={props.handleSubmit} noValidate={true}>

                <div className={`${showFilter ? 'filters_outer bg-transparent' : 'filters_outer p-0 bg-transparent'}`}>
                    <div className="top_Title justify-content-between d-flex bg-transparent mt-0">
                        <h1 className="m-0"><FormattedMessage id="LABEL_PIPELINE_VIEW" /></h1>
                        <span>
                            <button
                                type="button"
                                name="showFilter"
                                className={`${showFilter ? 'active' : ''}`}
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                <span className="d-lg-inline d-none">
                                    <FormattedMessage id="LABEL_PIPELINE_FILTERS" />
                                </span>
                                <i>
                                    <FontAwesomeIcon className="" icon={faFilter} />
                                </i>
                            </button>
                        </span>
                    </div>

                    <div data-test="pipelineFiltersContainer" className={`filters_inner form_style  ${showFilter ? 'active' : 'deactive'}`}>
                        <div className="row">
                            <div className="col-lg-4 pr-lg-0">
                                <div className="inner_content">
                                    <div className="form-group">
                                        <Field
                                            name="projectName"
                                            data-test="projectName"
                                            type="text"
                                            component={PdsFormInput}
                                            labelKey="LABEL_PIPELINE_FILTERS_PROJECT_NAME"
                                            placeholderKey="PLACEHOLDER_PROJECT_NAME"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field
                                            name="projectRefId"
                                            data-test="projectRefId"
                                            type="text"
                                            component={PdsFormInput}
                                            labelKey="LABEL_PIPELINE_FILTERS_PROJECT_ID"
                                            placeholderKey="PLACEHOLDER_PROJECT_ID"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4 px-lg-0">
                                <div className="inner_content">
                                    <div className="form-group">
                                        <label><FormattedMessage id="LABEL_PIPELINE_FILTERS_PROJECT_STATUS" /></label>
                                        <div className="select-wrapper">
                                            <Field
                                                name="projectStatus"
                                                data-test="status"
                                                component={PdsFormSelect}
                                                normalize={normalizeToNumber}
                                            >
                                                <FormattedMessage id="PLACEHOLDER_PROJECT_STATUS">
                                                    {(message) => <option value="">{message}</option>}
                                                </FormattedMessage>
                                                {getDropdown(props.lookupValues, LookupType.Project_Status)}
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 pl-lg-0">
                                <div className="inner_content">
                                    <div className="form-group range-date">
                                        <label className="d-block">
                                            <FormattedMessage id="LABEL_PIPELINE_FILTERS_PROJECT_START_DATE" />
                                        </label>
                                        <div className="cal_icon">
                                            <label><FormattedMessage id="LABEL_FROM" /></label>
                                            <div className="col-md-12 position-relative manipulate-calendar p-0">
                                                <DatePicker
                                                    name="projectStartDate"
                                                    data-test="projectStartDate"
                                                    enablePastDate={true}
                                                    isDateInitiallyEmpty={true}
                                                />
                                            </div>
                                        </div>

                                        <div className="cal_icon">
                                            <label><FormattedMessage id="LABEL_TO" /></label>
                                            <div className="col-md-12 position-relative manipulate-calendar p-0">
                                                <DatePicker
                                                    name="projectEndDate"
                                                    data-test="projectEndDate"
                                                    enablePastDate={true}
                                                    isDateInitiallyEmpty={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mr-35 two-side-btn py-3">
                            <button type="button" data-test="clear" className="active ml-auto" onClick={() => clearAll()}>
                                <FormattedMessage id="LABEL_PIPELINE_BUTTON_CLEAR_ALL" />
                            </button>

                            <button type="button" data-test="apply" onClick={props.handleSubmit((values) => createFilterData(values))}>
                                {props.applyFilterLoader && <CircularProgress />}
                                <FormattedMessage id="LABEL_PIPELINE_BUTTON_APPLY_FILTER" />
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        );
    };


const form = reduxForm<IPipelineFilters, IProps>({
    form: 'ProjectPipelineFilters',
    enableReinitialize: true,
})(injectIntl(ProjectPipelineFilters));


export default connect()(form);
