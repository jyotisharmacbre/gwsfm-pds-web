import { IProjectPipelineGrid } from './IProjectPipelineGrid';
export interface IProjectPipelineGridState {

  totalNumberOfRecord: number;
  data: Array<IProjectPipelineGrid>
  error: string | null;
}
