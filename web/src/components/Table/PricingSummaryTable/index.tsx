import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import * as actions from '../../../store/rootActions';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import { calculateSell, calculateAverageMargin } from '../../../helpers/formulas';
import {
	getSubContractorSummaryCalculation,
	getPreliminarySummaryCalculation,
	getDiscountSummaryCalculation
} from '../../../helpers/pricing-calculation-helper';
import IPricing from '../../../models/IPricing';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { FormattedMessage } from 'react-intl';
import { IDiscountActivity } from '../../../store/DiscountForm/Types/IDiscountActivity';
import { calculateClientDiscount,calculateTotalSum } from '../../../helpers/formulas';
import { getPropertyName, getFilterElementFromArray } from '../../../helpers/utility-helper';

interface Props {
	preliminary?: Array<IPreliminariesComponentDetails>;
	subContractor?: Array<ISubContractorActivity>;
	discount?: IDiscountActivity;
    currencySymbol:string;
}

const PricingSummaryTable: React.FC<Props> = (props) => {
	let initDiscount: IPricing = { cost: 0, sell: 0, margin: 0 };
	const [ subContractorData, setSubContractorData ] = useState({ ...initDiscount });
	const [ preliminaryData, setPreliminaryData ] = useState({ ...initDiscount });
	
	useEffect(() => {
		if(props.subContractor && props.subContractor[0].projectId)
		{
			setSubContractorData(getSubContractorSummaryCalculation(props.subContractor));
		}
   }, [props.subContractor]);

	useEffect(() => {
		if(props.preliminary && props.preliminary.length > 0)
            setPreliminaryData(getPreliminarySummaryCalculation(props.preliminary));
    }, [props.preliminary]);

	return (
		<div className="price-sumry">
			<label>Pricing Summary</label>
			<div className="inner-block">
				<table className="price-table">
					<thead>
						<tr>
							<th />
							<th>Cost ({props.currencySymbol})</th>
							<th>Margin (%)</th>
							<th>Sell ({props.currencySymbol})</th>
						</tr>
					</thead>
					<tbody>
						{props.preliminary ? (
							<tr data-test="preliminary-data">
								<td>Preliminaries</td>
								<td>
									{props.currencySymbol}
									<span data-test="total-margin-summary">{preliminaryData.cost}</span>
								</td>
								<td>
									<span data-test="gross-margin-summary">{preliminaryData.margin}</span>
									(%)
								</td>
								<td>
									{props.currencySymbol}
									<span data-test="total-sell-summary">{preliminaryData.sell}</span>
								</td>
							</tr>
						) : null}
						{props.subContractor ? (
							<tr data-test="sub-contractor-data">
								<td>Subcontractors</td>
								<td>
									{props.currencySymbol}
									<span data-test="sub-contractor-cost">{subContractorData.cost}</span>
								</td>
								<td>
									<span data-test="sub-contractor-margin">{subContractorData.margin}</span>(%)
								</td>
								<td>
									{props.currencySymbol}
									<span data-test="sub-contractor-sell">{subContractorData.sell}</span>
								</td>
							</tr>
						) : null}
						{props.discount ? (
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
										{props.discount.discountType == 1 ? (
											`(${props.discount.clientDiscount}%)`
										) : null}
									</td>
								</tr>
								<tr>
									<td />
									<td>
										{props.currencySymbol}
										<span data-test="sub-contractor-discount">
											{props.discount.supplierTotalDiscount}
										</span>
									</td>
									<td />
									<td>
										{props.currencySymbol}
										<span data-test="customer-discount">
											{props.discount &&
												calculateClientDiscount(
													props.discount.discountType,
													calculateTotalSum(subContractorData.sell, preliminaryData.sell),
													props.discount.clientDiscount as number
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


export default PricingSummaryTable;
