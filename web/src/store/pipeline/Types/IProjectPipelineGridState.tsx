import { IProjectPipelineGrid } from './IProjectPipelineGrid';
import IProjectChartSummary from '../../../models/IProjectChartSummary';
export interface IProjectPipelineGridState {
    projectChartSummary: {
        data: Array<IProjectChartSummary>;
        loading: boolean;
        error: string | null;
    };
    totalNumberOfRecord: number;
    data: Array<IProjectPipelineGrid>
    error: string | null;
    loading: boolean;
}
