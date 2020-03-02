import { IProjectPipelineGrid } from './IProjectPipelineGrid';
import IProjectChartSummary from '../../../models/IProjectChartSummary';
export interface IProjectPipelineGridState {
    pipelineDetails: Array<IProjectPipelineGrid>;
    error: string | null;
    projectChartSummary: {
        data: Array<IProjectChartSummary>;
        loading: boolean;
        error: string | null;
    }
}
