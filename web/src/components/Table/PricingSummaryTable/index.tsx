import React, { useState, useEffect } from 'react';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import {
	getSubContractorSummaryCalculation,
	getPreliminarySummaryCalculation} from '../../../helpers/pricing-calculation-helper';
import IPricing from '../../../models/IPricing';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IDiscountActivity } from '../../../store/DiscountForm/Types/IDiscountActivity';
import { calculateClientDiscount,calculateTotalSum } from '../../../helpers/formulas';

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
		if(props.subContractor)
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
				<table className="price-table table_responsive">
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
								<td data-column="&nbsp;">Preliminaries</td>
                                <td data-column={`Cost (${props.currencySymbol})`}>
                                    {props.currencySymbol}
									<span data-test="total-margin-summary">{preliminaryData.cost}</span>
								</td>
								<td data-column={`Margin (%)`}>
									<span data-test="gross-margin-summary">{preliminaryData.margin}</span>
									(%)
								</td>
                                <td data-column={`Sell (${props.currencySymbol})`}>
                                    {props.currencySymbol}
									<span data-test="total-sell-summary">{preliminaryData.sell}</span>
								</td>
							</tr>
						) : null}
						{props.subContractor ? (
							<tr data-test="sub-contractor-data">
								<td data-column="&nbsp;">Subcontractors</td>
                                <td data-column={`Cost (${props.currencySymbol})`}>
                                    {props.currencySymbol}
									<span data-test="sub-contractor-cost">{subContractorData.cost}</span>
								</td>
								<td data-column={`Margin (%)`}>
									<span data-test="sub-contractor-margin">{subContractorData.margin}</span>(%)
								</td>
                                <td data-column={`Sell (${props.currencySymbol})`}>
                                    {props.currencySymbol}
									<span data-test="sub-contractor-sell">{subContractorData.sell}</span>
								</td>
							</tr>
						) : null}
						{props.discount ? (
							<React.Fragment>
								<tr>
									<br/>
								</tr>
								<tr data-test="discount-data">
									<td data-column="&nbsp;">Disount</td>
                                    <td data-column={`Cost (${props.currencySymbol})`}>Sub-Contractor</td>
									<td data-column={`Margin (%)`}>&nbsp;</td>
                                    <td data-column={`Sell (${props.currencySymbol})`}>
										Customer{' '}
										{props.discount.discountType == 1 ? (
											`(${props.discount.clientDiscount}%)`
										) : null}
									</td>
								</tr>
								<tr>
									<td data-column="&nbsp;">&nbsp;</td>
                                    <td data-column={`Cost (${props.currencySymbol})`}>
                                        {props.currencySymbol}
										<span data-test="sub-contractor-discount">
											{props.discount.supplierTotalDiscount}
										</span>
										&nbsp;
									</td>
									<td data-column="Margin (%)">&nbsp;</td>
                                    <td data-column={`Sell (${props.currencySymbol})`} >
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
