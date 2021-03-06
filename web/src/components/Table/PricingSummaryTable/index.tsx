import React, { useState, useEffect } from 'react';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import {
	getSubContractorSummaryCalculation,
	getPreliminarySummaryCalculation,
	calculatePercentage,
	getSupplierTotalDiscount
} from '../../../helpers/pricing-calculation-helper';
import IPricing from '../../../models/IPricing';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IDiscountActivity } from '../../../store/DiscountForm/Types/IDiscountActivity';
import { calculateClientDiscount, calculateTotalSum } from '../../../helpers/formulas';
import { FormattedMessage } from 'react-intl';
import { formatMessage } from '../../../Translations/connectedIntlProvider';

interface Props {
	preliminary: Array<IPreliminariesComponentDetails>;
	subContractor: Array<ISubContractorActivity>;
	discount: IDiscountActivity;
	currencySymbol: string;
	insuranceRate?: number;
	countryCode: string;
	showDiscount: boolean;
	showContractor: boolean;
	showPreliminary: boolean;
	showInsurance: boolean;
}

const PricingSummaryTable: React.FC<Props> = (props) => {
	let initDiscount: IPricing = { cost: 0, sell: 0, margin: 0 };
	const [subContractorData, setSubContractorData] = useState({ ...initDiscount });
	const [preliminaryData, setPreliminaryData] = useState({ ...initDiscount });
	const [discountData, setDiscountData] = useState({ ...initDiscount });

	useEffect(
		() => {
			if (props.subContractor) {
				setSubContractorData(getSubContractorSummaryCalculation(props.subContractor));
			}
		},
		[props.subContractor]
	);

	useEffect(
		() => {
			if (props.preliminary && props.preliminary.length > 0)
				setPreliminaryData(getPreliminarySummaryCalculation(props.preliminary));
		},
		[props.preliminary]
	);

	return (
		<div className="price-sumry">
			{(props.showPreliminary || props.showContractor) && (
				<label>
					<FormattedMessage id="TITLE_PRICING_SUMMARY" />
				</label>
			)}
			<div className="inner-block">
				<table className="price-table table_responsive">
					{(props.showPreliminary || props.showContractor) && (
						<thead>
							<tr>
								<th className="width-percent25" />
								<th className="width-percent25">
									<FormattedMessage id="TITLE_COST" /> ({props.currencySymbol})
								</th>
								<th className="width-percent25">
									<FormattedMessage id="TITLE_MARGIN" /> (%)
								</th>
								<th className="width-percent25">
									<FormattedMessage id="TITLE_SELL" /> ({props.currencySymbol})
								</th>
							</tr>
						</thead>
					)}
					<tbody>
						{props.showPreliminary && props.preliminary ? (
							<tr data-test="preliminary-data">
								<td data-column="&nbsp;">
									<FormattedMessage id="TITLE_PRELIMINARIES" />
								</td>
								<td data-column={`Cost (${props.currencySymbol})`}>
									{props.currencySymbol}
									<span data-test="total-margin-summary">{preliminaryData.cost.toFixed(2)}</span>
								</td>
								<td data-column={`Margin (%)`}>
									<span data-test="gross-margin-summary">{preliminaryData.margin}</span>
									(%)
								</td>
								<td data-column={`Sell (${props.currencySymbol})`}>
									{props.currencySymbol}
									<span data-test="total-sell-summary">{preliminaryData.sell.toFixed(2)}</span>
								</td>
							</tr>
						) : null}
						{props.showContractor && props.subContractor ? (
							<tr data-test="sub-contractor-data">
								<td data-column="&nbsp;">
									<FormattedMessage id='TITLE_SUBCONTRACTORS' />
								</td>
								<td data-column={`Cost (${props.currencySymbol})`}>
									{props.currencySymbol}
									<span data-test="sub-contractor-cost">{subContractorData.cost.toFixed(2)}</span>
								</td>
								<td data-column={`Margin (%)`}>
									<span data-test="sub-contractor-margin">{subContractorData.margin}</span>(%)
								</td>
								<td data-column={`Sell (${props.currencySymbol})`}>
									{props.currencySymbol}
									<span data-test="sub-contractor-sell">{subContractorData.sell.toFixed(2)}</span>
								</td>
							</tr>
						) : null}
					</tbody>
				</table>

				<table className="price-table table_responsive">
					{(props.showPreliminary || props.showContractor) && (
						<thead>
							<tr>
								<th className="width-percent25" />
								<th className="width-percent25">
									<FormattedMessage id="TITLE_SUB_CONTRACTOR" />
								</th>
								<th className="width-percent25">
									<FormattedMessage id='TITLE_CUSTOMER' />{' '}
									{props.discount?.clientDiscount?.discountType == 0 ? (
										`(${props.discount.clientDiscount.discount}%)`
									) : null}
								</th>
							</tr>
						</thead>
					)}
					<tbody>
						{props.showDiscount && props.discount ? (
							<React.Fragment>
								<tr data-test="discount-data">
									<td data-column="&nbsp;">
										<FormattedMessage id="TITLE_DISOUNT" />
									</td>
									<td data-column=
									{formatMessage('TITLE_SUB_CONTRACTOR')}>
										{props.currencySymbol}
										<span data-test="sub-contractor-discount">
											{
												props.discount && getSupplierTotalDiscount(props.discount.subContractorDiscounts)
											}
										</span>
										&nbsp;
									</td>

									<td data-column={`${formatMessage('TITLE_CUSTOMER')} 
									${props.discount?.clientDiscount?.discountType == 1 ? (
										`(${props.discount.clientDiscount.discount}%)`
									) : null}`}>
										{props.currencySymbol}
										<span data-test="customer-discount">
											{props.discount && props.discount.clientDiscount &&
												calculateClientDiscount(
													props.discount.clientDiscount.discountType,
													calculateTotalSum(subContractorData.sell, preliminaryData.sell),
													props.discount.clientDiscount.discount as number
												)}
										</span>
									</td>
								</tr>
							</React.Fragment>
						) : null}
					</tbody>
				</table>

				<table className="price-table table_responsive">
					{props.showInsurance && (
						<thead>
							<tr>
								<th className="width-percent25" />
								<th className="width-percent25">
								<FormattedMessage id=
					{props.countryCode.toLowerCase() == 'gbr' ? 'LABEL_INSURANCE_COST' : 'LABEL_SGA_COST'} />
								</th>
								<th className="width-percent25">
								<FormattedMessage id=
			{props.countryCode.toLowerCase() == 'gbr' ? ('LABEL_INSURANCE_PERCENTAGE') : ('LABEL_SGA_PERCENTAGE')} />
								</th>
							</tr>
						</thead>
					)}
					<tbody>
						{props.showInsurance ? (
							<React.Fragment>
								<tr>
									<td data-column="&nbsp;">
										<FormattedMessage id={props.countryCode.toLowerCase() == 'gbr' ? 'LABEL_INSURANCE' : 'LABEL_SGA'} />
										&nbsp;
									</td>
						<td data-column={formatMessage(props.countryCode.toLowerCase() == 'gbr' ? 'LABEL_INSURANCE_COST' : 'LABEL_SGA_COST')}>
										{props.currencySymbol}
										<span>
											{props.insuranceRate ? (
												calculatePercentage(
													preliminaryData.cost +
													subContractorData.cost -
													(props.discount ? getSupplierTotalDiscount(props.discount?.subContractorDiscounts) : 0),
													props.insuranceRate
												).toFixed(2)
											) : null}
										</span>
										&nbsp;
									</td>
									<td data-column={formatMessage(props.countryCode.toLowerCase() == 'gbr' ? ('LABEL_INSURANCE_PERCENTAGE') : ('LABEL_SGA_PERCENTAGE'))}>
										<span>{props.insuranceRate ? `${props.insuranceRate}(%)` : null}</span>
										&nbsp;
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
