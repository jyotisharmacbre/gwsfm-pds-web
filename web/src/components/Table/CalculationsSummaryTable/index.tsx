import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import * as actions from '../../../store/rootActions';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import { calculateTotalSum, calculateSell, calculateAverageMargin } from '../../../helpers/formulas';
import {
	getSubContractorSummaryCalculation,
	getPreliminarySummaryCalculation,
	getDiscountSummaryCalculation
} from '../../../helpers/pricing-calculation-helper';
import ISummaryCalculation from '../../../models/ISummaryCalculation';
import IPricing from '../../../models/IPricing';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { FormattedMessage } from 'react-intl';
import { IDiscountActivity } from '../../../store/DiscountForm/Types/IDiscountActivity';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import Currency from '../../../store/Lookups/InitialState/Currency';
import { getPropertyName, getFilterElementFromArray } from '../../../helpers/utility-helper';

interface Props {
	subContractor?: Array<ISubContractorActivity>;
	preliminary?: Array<IPreliminariesComponentDetails>;
	discount?: {} | IDiscountActivity;
	currencySymbol: string;
}

const CalculationsSummaryTable: React.FC<Props> = (props) => {
	let initPricing: IPricing = { cost: 0, sell: 0, margin: 0 };
	let initSummary: ISummaryCalculation = { cost: 0, sell: 0, margin: 0, grossMargin: 0 };
	const [ summaryCalculation, setSummaryCalculationState ] = useState<ISummaryCalculation>({ ...initSummary });
	const [ subContractorData, setSubContractorData ] = useState({ ...initPricing });
	const [ preliminaryData, setPreliminaryData ] = useState({ ...initPricing });
	useEffect(
		() => {
			if (props.subContractor && props.subContractor[0].projectId) {
				setSubContractorData(getSubContractorSummaryCalculation(props.subContractor));
			}
		},
		[ props.subContractor ]
	);

	useEffect(
		() => {
			if (props.preliminary && props.preliminary.length > 0) {
				setPreliminaryData(getPreliminarySummaryCalculation(props.preliminary));
			}
		},
		[ props.preliminary ]
	);

	useEffect(
		() => {
			if (props.discount && subContractorData && preliminaryData) {
				setSummaryCalculationState(
					getDiscountSummaryCalculation(
						props.discount as IDiscountActivity,
						subContractorData,
						preliminaryData
					)
				);
			}
		},
		[ props.discount, subContractorData, preliminaryData ]
	);
	return (
		<div className="col-lg-12 px-0">
			<div className="price-sumry discount_table">
				<div className="inner-block">
					<table className="price-table">
						<thead>
							<tr>
								<th>
									<FormattedMessage id="T_HEADING_TOTAL_COST" />{' '}
								</th>
								<th>
									<FormattedMessage id="T_HEADING_TOTAL_MARGIN" />{' '}
								</th>
								<th>
									<FormattedMessage id="T_HEADING_GROSS_MARGIN" />{' '}
								</th>
								<th>
									<FormattedMessage id="T_HEADING_TOTAL_SELL" />{' '}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									{props.currencySymbol}
									<span data-test="total-cost-summary">{summaryCalculation.cost}</span>
								</td>
								<td>
									<span data-test="total-margin-summary">{summaryCalculation.margin}</span>
									(%)
								</td>
								<td>
									{props.currencySymbol}
									<span data-test="gross-margin-summary">{summaryCalculation.grossMargin}</span>
								</td>
								<td>
									{props.currencySymbol}
									<span data-test="total-sell-summary">{summaryCalculation.sell.toFixed(2)}</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default CalculationsSummaryTable;
