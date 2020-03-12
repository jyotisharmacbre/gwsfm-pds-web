import IPagingParams from './IPagingParams';
import ISortingParams from './ISortingParams';
import IFilterParams from './IFilterParams';

interface IQueryParams {
    pagingParams: IPagingParams;
    sortingParams: ISortingParams;
    filterParams?: Array<IFilterParams>;
}

export default IQueryParams;