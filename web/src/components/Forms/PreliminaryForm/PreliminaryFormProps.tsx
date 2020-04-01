import EventType from "../../../enums/EventType";

export interface Props {
	onSave: (saveAll: boolean, event: EventType, prelimComponentDetails: any, index: number) => void;
	onPrevious: () => void;
	onToggle: (id: string) => void;
	preliminariesDetails: any;
	currencySymbol: string;
	isExpand: boolean;
	componentIdList: Array<string>;
	countryCode: string;
	insuranceRate: number;
	preliminaryState: any;
	subContractorState: any;
	discountState: any;
	projectStatus: number;
	event: EventType;
	loading: boolean;
}