import IPagingParams from './IPagingParams';
import ISortingParams from './ISortingParams';

interface IQueryParams {
    pagingParams: IPagingParams;
    sortingParams: ISortingParams;
}

export default IQueryParams;