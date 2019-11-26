import { IProjectPipelineGrid } from './IProjectPipelineGrid';
import { Notify } from '../../../helpers/constants';

export interface IProjectPipelineGridState {
  pipelineDetails: Array<IProjectPipelineGrid>;
  error: string | null;
}
