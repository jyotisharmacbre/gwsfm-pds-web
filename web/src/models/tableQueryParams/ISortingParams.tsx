import SortOrder from "../../enums/SortOrder";

interface ISortingParams {
    sortOrder: SortOrder;
    sortColumnName: string | null;
}

export default ISortingParams;