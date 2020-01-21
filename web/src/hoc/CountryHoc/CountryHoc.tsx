import React, { useEffect, useState } from 'react';
import { getFilterElementFromArray } from '../../helpers/utility-helper';

export const countryHoc = (Component) => (props) => {
	const [ countryCode, setCountryCode ] = useState<string>('');
	useEffect(
		() => {
			if (props.project.countryId > 0 && props.countries) {
				setCountryCode(
					getFilterElementFromArray(props.countries, 'countryId', props.project.countryId, 'code')
				);
			}
		},
		[ props.project.countryId, props.countries ]
	);
	return <Component {...props} countryCode={countryCode} />;
};
