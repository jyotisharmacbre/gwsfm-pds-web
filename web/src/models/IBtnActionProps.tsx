import { Color } from "../enums/Color";

export interface IBtnActionProps {
    Title: string;
    Icon?: any;
    Color?: Color;
    LinkTo?: string;
    HandleClick?: () => void;
    isSubmit?: boolean;
}