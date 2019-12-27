import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import * as actions from '../../../store/rootActions';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import CalculationsSummaryType from '../../../enums/CalculationsSummaryType';
import { calculateSell, calculateAverageMargin } from '../../../helpers/formulas';
import {
	getSubContractorSummaryCalculation,
	getPreliminarySummaryCalculation,
	getDiscountSummaryCalculation
} from '../../../helpers/pricing-calculation-helper';
import ISummaryCalculation from '../../../store/SummaryCalculation/Types/ISummaryCalculation';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { FormattedMessage } from 'react-intl';
import { IDiscountActivity } from '../../../store/DiscountForm/Types/IDiscountActivity';
import { calculateClientDiscount,calculateTotalSum } from '../../../helpers/formulas';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import Currency from '../../../store/Lookups/InitialState/Currency';
import { getPropertyName, getFilterElementFromArray } from '../../../helpers/utility-helper';

interface Props {
	projectId?: string;
	showPreliminary?: boolean;
	showSubContractor?: boolean;
	showDiscount?: boolean;
}

interface IMapStateToProps {
	summaryCalculation: ISummaryCalculation;
	subContractorState: Array<ISubContractorActivity>;
	preliminaryState: Array<IPreliminariesComponentDetails>;
	discountState: IDiscountActivity;
	currencyId: number;
	currencies: Array<ICurrency> | null;
}

interface IMapDispatchToProps {
	getSubContractor: (projectId: string) => void;
	getPreliminaryDetails: (projectId: string) => void;
	getDiscountData: (projectId: string) => void;
	getAllCurrencies: () => void;
	getProjectDetail: (projectId: string) => void;
}

const PricingSummaryTable: React.FC<Props & IMapStateToProps & IMapDispatchToProps> = (props) => {
	let initDiscount: ISummaryCalculation = { cost: 0, sell: 0, margin: 0 };
	const [ subContractorData, setSubContractorData ] = useState({ ...initDiscount });
	const [ preliminaryData, setPreliminaryData ] = useState({ ...initDiscount });
	const [ discountData, setDiscountData ] = useState({ ...initDiscount });
	const CurrencyObj = new Currency();
	const [ currencySymbol, setCurrencySymbol ] = useState<string>('');

	useEffect(() => {
		props.getAllCurrencies();
		if (props.projectId != '' && props.projectId != undefined && props.projectId != null) {
			props.getProjectDetail(props.projectId);
			if (props.showSubContractor) props.getSubContractor(props.projectId);
			if (props.showPreliminary) props.getPreliminaryDetails(props.projectId);
			if (props.showDiscount) props.getDiscountData(props.projectId);
		}
	}, []);

	useEffect(
		() => {
			if (props.currencyId > 0 && props.currencies) {
				setCurrencySymbol(
					getFilterElementFromArray(
						props.currencies,
						getPropertyName(CurrencyObj, (prop) => prop.currencyId),
						props.currencyId,
						getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
					)
				);
			}
		},
		[ props.currencyId, props.currencies ]
	);

	useEffect(
		() => {
			if (props.subContractorState)
				setSubContractorData(getSubContractorSummaryCalculation(props.subContractorState, { ...initDiscount }));
		},
		[ props.subContractorState ]
	);

	useEffect(
		() => {
			if (props.preliminaryState && props.preliminaryState.length > 0)
				setPreliminaryData(getPreliminarySummaryCalculation(props.preliminaryState, { ...initDiscount }));
		},
		[ props.preliminaryState ]
	);

	useEffect(
		() => {
			if (props.discountState) setDiscountData(getDiscountSummaryCalculation(props.discountState, discountData));
		},
		[ props.discountState ]
	);

	return (
		<div className="price-sumry">
			<label>Pricing Summary</label>
			<div className="inner-block">
				<table className="price-table">
					<thead>
						<tr>
							<th />
							<th>Cost ({currencySymbol})</th>
							<th>Margin (%)</th>
							<th>Sell ({currencySymbol})</th>
						</tr>
					</thead>
					<tbody>
						{props.showPreliminary ? (
							<tr data-test="preliminary-data">
								<td>Preliminaries</td>
								<td>
									{currencySymbol}
									<span data-test="total-margin-summary">{preliminaryData.cost}</span>
								</td>
								<td>
									<span data-test="gross-margin-summary">{preliminaryData.margin}</span>
									(%)
								</td>
								<td>
									{currencySymbol}
									<span data-test="total-sell-summary">{preliminaryData.sell}</span>
								</td>
							</tr>
						) : null}
						{props.showSubContractor ? (
							<tr data-test="sub-contractor-data">
								<td>Subcontractors</td>
								<td>
									{currencySymbol}
									<span data-test="sub-contractor-cost">{subContractorData.cost}</span>
								</td>
								<td>
									<span data-test="sub-contractor-margin">{subContractorData.margin}</span>(%)
								</td>
								<td>
									{currencySymbol}
									<span data-test="sub-contractor-sell">{subContractorData.sell}</span>
								</td>
							</tr>
						) : null}
						{props.showDiscount ? (
							<React.Fragment>
								<tr>
									<th />
									<th />
									<th />
									<th />
								</tr>
								<tr data-test="discount-data">
									<td>Disount</td>
									<td>Sub-Contractor</td>
									<td />
									<td>
										Customer{' '}
										{props.discountState.discountType == 1 ? (
											`(${props.discountState.clientDiscount}%)`
										) : null}
									</td>
								</tr>
								<tr>
									<td />
									<td>
										{currencySymbol}
										<span data-test="sub-contractor-discount">
											{props.discountState.supplierTotalDiscount}
										</span>
									</td>
									<td />
									<td>
										{currencySymbol}
										<span data-test="customer-discount">
											{props.discountState &&
												calculateClientDiscount(
													props.discountState.discountType,
													calculateTotalSum(subContractorData.sell, preliminaryData.sell),
													props.discountState.clientDiscount as number
												)}
										</span>
									</td>
								</tr>
							</React.Fragment>
						) : null}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSubContractor: (projectId: string) => dispatch(actions.getSubContractor(projectId)),
		getPreliminaryDetails: (projectId: string) => dispatch(actions.getPreliminaryDetails(projectId)),
		getDiscountData: (projectId: string) => dispatch(actions.getDiscountData(projectId)),
		getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
		getProjectDetail: (projectId) => dispatch(actions.getProjectDetail(projectId))
	};
};

const mapStateToProps = (state: IState) => ({
	summaryCalculation: state.summaryCalculation,
	subContractorState: state.subContractor.form.activities,
	preliminaryState: state.preliminary.preliminaryDetails,
	discountState: state.discount.form,
	currencyId: state.project.form.currencyId,
	currencies: state.lookup.currencies
});

export default connect(mapStateToProps, mapDispatchToProps)(PricingSummaryTable);
