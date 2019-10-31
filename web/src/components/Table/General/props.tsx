export interface IGeneralTableProps {
  headers: IGeneralTableHeaderProps[];
  content: string;
  editActionClick: () => void;
}

export interface IGeneralTableHeaderProps {
  heading: string;
  subHeading: string;
}
