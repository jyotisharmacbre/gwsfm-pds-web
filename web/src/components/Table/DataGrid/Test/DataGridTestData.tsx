export const gridTestColumns = () => {
    return [
        {
            dataField: 'projectRefId',
            text: "Project Id",
            attrs: () => ({ 'data-column': '1' }),
            sort: true,
            sortCaret: jest.fn(),
            formatter: jest.fn(),
        },
        {
            dataField: 'name',
            text: 'Name',
            attrs: () => ({ 'data-column': 'Test' }),
            sort: true,
            sortCaret: jest.fn(),
            formatter: jest.fn(),
        }
    ]
};

export const gridTestData = () => {
    return [
        {
            projectRefId: 1,
            name: 'Test1'
        },
        {
            projectRefId: 2,
            name: 'Test2'
        }
    ]
};
