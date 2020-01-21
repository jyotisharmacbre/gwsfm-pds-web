import React, { useEffect, useState } from 'react';
import AdminFields from '../../enums/AdminFields';
import { getFilterElementFromArray } from '../../helpers/utility-helper';

export const insuranceRateHoc = (Component) => (props) => {
	const [ insuranceRate, setInsuranceRate ] = useState<number>(0);
	useEffect(
		() => {
			let insurace;
			if (props.adminDefaultValues.length > 0) {
				props.adminDefaultValues.map((x) => {
					if (x.name == AdminFields.InsuranceRatePerc) {
						setInsuranceRate(parseFloat(x.value));
					}
				});
			}
		},
		[ props.adminDefaultValues ]
	);
	return <Component {...props} insuranceRate={insuranceRate} />;
};
