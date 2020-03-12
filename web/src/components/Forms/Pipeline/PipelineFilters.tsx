import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import IPipelineFilters from '../../../models/IPipelineFilters';
import IFilterParams from '../../../models/tableQueryParams/IFilterParams';
import IReactIntl from '../../../Translations/IReactIntl';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';

interface IProps {
    onApplyFilter: (data: IFilterParams) => void;
}

const PipelineFilters: React.FC<IProps & IReactIntl & InjectedFormProps<IPipelineFilters, IProps>>
    = (props) => {

        const createFilterData = (piplineFilterData: IPipelineFilters) => {
            console.log(piplineFilterData);
            const filterData = {} as IFilterParams;
            props.onApplyFilter(filterData);
        }

        const reset = () => {

        }

        return (
            <form className="custom-wrap p-0" onSubmit={props.handleSubmit} noValidate={true}>
                <div>
                </div>
            </form>
        );
    };


const form = reduxForm<IPipelineFilters, IProps>({
    form: 'PipelineFilters',
    enableReinitialize: true,
})(injectIntl(PipelineFilters));


export default connect()(form);
