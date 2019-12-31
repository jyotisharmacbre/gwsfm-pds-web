import { calculateSell, calculateAverageMargin, calculateClientDiscount } from './formulas';
import { ISubContractorActivity } from '../store/SubContractor/Types/ISubContractorActivity';
import ISummaryCalculation from '../models/ISummaryCalculation';
import IPricing from '../models/IPricing';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IPreliminariesItems } from '../store/Preliminaries/Types/IPreliminariesItems';
import { IDiscountActivity } from '../store/DiscountForm/Types/IDiscountActivity';

export const getSubContractorSummaryCalculation = (data: Array<ISubContractorActivity>) => {
	let state: IPricing = { cost: 0, sell: 0, margin: 0 };
	data.map((element: ISubContractorActivity) => {
		state.cost = state.cost + +element.totalCost;
		state.sell = state.sell + +calculateSell(element.totalCost, element.grossMargin);
	});
	state.margin = +calculateAverageMargin(state.cost, state.sell);
	return { cost: state.cost, sell: state.sell, margin: state.margin };
};
export const getPreliminarySummaryCalculation = (data: Array<IPreliminariesComponentDetails>) => {
	let state: IPricing = { cost: 0, sell: 0, margin: 0 };
	if (data.length > 0) {
		data.map((details: IPreliminariesComponentDetails) => {
			details.items.map((element: IPreliminariesItems) => {
				state.cost = state.cost + +element.totalCost;
				state.sell = state.sell + +calculateSell(element.totalCost, element.grossMargin);
			});
		});
		state.margin = +calculateAverageMargin(state.cost, state.sell);
	}
	return { cost: state.cost, sell: state.sell, margin: state.margin };
};

export const getDiscountSummaryCalculation = (
	data: IDiscountActivity,
	subContractorState: IPricing,
	preliminaryState: IPricing
) => {
	let discountData = { ...data };
	if (discountData.supplierTotalDiscount == null) discountData.supplierTotalDiscount = 0;
	if (discountData.clientDiscount == null) discountData.clientDiscount = 0;
	let state: ISummaryCalculation = { cost: 0, sell: 0, margin: 0, grossMargin: 0 };
	if (discountData.supplierTotalDiscount != undefined)
		state.cost = subContractorState.cost + preliminaryState.cost - discountData.supplierTotalDiscount;
	if (discountData.clientDiscount != undefined) {
		state.sell =
			subContractorState.sell +
			preliminaryState.sell -
			+calculateClientDiscount(
				discountData.discountType,
				subContractorState.sell + preliminaryState.sell,
				discountData.clientDiscount
			);
	}
	state.margin = +calculateAverageMargin(state.cost, state.sell);
	state.grossMargin = parseFloat((state.sell - state.cost).toFixed(2));
	return { cost: state.cost, sell: state.sell, margin: state.margin, grossMargin: state.grossMargin };
};
