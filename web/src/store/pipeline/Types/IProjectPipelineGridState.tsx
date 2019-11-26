import { IProjectPipelineGrid } from './IProjectPipelineGrid';
export interface IProjectPipelineGridState {
  pipelineDetails: Array<IProjectPipelineGrid>;
  error: string | null;
}
