import { calculateSell, calculateAverageMargin, calculateClientDiscount } from './formulas';
import { ISubContractorActivity } from '../store/SubContractor/Types/ISubContractorActivity';
import ISummaryCalculation from '../models/ISummaryCalculation';
import IPricing from '../models/IPricing';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IPreliminariesItems } from '../store/Preliminaries/Types/IPreliminariesItems';
import { IDiscountActivity } from '../store/DiscountForm/Types/IDiscountActivity';
import IDiscountSubContractor from '../store/DiscountForm/Types/IDiscountSubContractor';

export const getSupplierTotalDiscount = (data: IDiscountSubContractor[]) => {
	var totalDiscount = data && data.map(x => x.supplierTotalDiscount).reduce(function (previousValue, currentValue) {
		let total = 0;
		if (previousValue) total += parseFloat(previousValue.toString());
		if (currentValue) total += parseFloat(currentValue.toString());;
		return total;
	});
	return totalDiscount ? totalDiscount : 0;
}

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
	preliminaryState: IPricing,
	insuranceRate:number
) => {
	let discountData = { ...data };
	let supplierTotalDiscount = getSupplierTotalDiscount(data.subContractorDiscounts);

	if (!supplierTotalDiscount) supplierTotalDiscount = 0;

	if (discountData.clientDiscount && !discountData.clientDiscount.discount) discountData.clientDiscount.discount = 0;
	let state: ISummaryCalculation = { cost: 0, sell: 0, margin: 0, grossMargin: 0 };
	state.cost = calculateInsurance((subContractorState.cost + preliminaryState.cost - supplierTotalDiscount),insuranceRate);
	if (discountData.clientDiscount != undefined) {
		state.sell =
			subContractorState.sell +
			preliminaryState.sell -
			+calculateClientDiscount(
				discountData.clientDiscount.discountType,
				subContractorState.sell + preliminaryState.sell,
				discountData.clientDiscount.discount ? discountData.clientDiscount.discount : 0
			);
	}
	state.margin = +calculateAverageMargin(state.cost, state.sell);
	state.grossMargin = parseFloat((state.sell - state.cost).toFixed(2));
	return { cost: state.cost, sell: state.sell, margin: state.margin, grossMargin: state.grossMargin };
};

export const calculatePercentage = (cost: number, insurance: number) => {
	return cost * insurance / 100;
};

export const calculateInsurance = (cost: number, insurance: number) => {
	if (insurance > 0) {
		return cost + calculatePercentage(cost, insurance);
	}
	return cost;
};
