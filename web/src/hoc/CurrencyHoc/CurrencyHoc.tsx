import React, { useEffect, useState } from 'react';
import { getFilterElementFromArray, getPropertyName } from '../../helpers/utility-helper';
import { ICurrency } from '../../store/Lookups/Types/ICurrency';
import Currency from '../../store/Lookups/InitialState/Currency';

export const currencyHoc = (Component) => (props) => {
	const CurrencyObj = new Currency();
	const [ currencySymbol, setCurrencySymbol ] = useState<string>('');
	useEffect(
		() => {
			if (props.project.currencyId > 0 && props.currencies) {
				setCurrencySymbol(
					getFilterElementFromArray(
						props.currencies,
						getPropertyName(CurrencyObj, (prop) => prop.currencyId),
						props.project.currencyId,
						getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
					)
				);
			}
		},
		[ props.project.currencyId, props.currencies ]
	);
	return <Component {...props} currencySymbol={currencySymbol} />;
};
