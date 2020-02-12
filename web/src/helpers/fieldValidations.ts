import { memoize } from 'lodash';
import { formatMessage } from './../Translations/connectedIntlProvider';
import PreliminaryComponentField from '../enums/PreliminaryComponentFields';

export const onlyNumber = (value) => (value && isNaN(Number(value)) ? formatMessage('VALIDATION_NUMBER') : undefined);

export function fieldValidationLength(value, maxLength) {
	value = value ? value.toString() : "";
	if (value && maxLength && value.length > maxLength) {
		return `${formatMessage('FIELD_VALIDATION_KEY', {
			0: formatMessage(maxLength)
		})}`;
	}
}
export function fieldValidationForMaxLimit(value, minLength, maxLength) {
	if (value < minLength) {
		return `${formatMessage('FIELD_VALIDATION_KEY_MAX_LIMIT', {
			0: formatMessage(minLength),
			1: formatMessage(maxLength)
		})}`
	} else if (value > maxLength) {
		return `${formatMessage('FIELD_VALIDATION_KEY_MAX_LIMIT', {
			0: formatMessage(minLength),
			1: formatMessage(maxLength)
		}

		)}`
	}
}



export function fieldValidationRequired(value, message) {

	value = value || value=== 0 ? value.toString() : "";

	if (
		!value ||
		(typeof value.trim === 'function' && value.trim() === '') ||
		(Array.isArray(value) && !value.length)
	) {
		return `${formatMessage('VALIDATION_IS_REQUIRED', {
			0: formatMessage(message)
		})}`;
	}
}

export const alphaNumeric = (value) =>
	value && /[^a-zA-Z0-9 ]/i.test(value) ? formatMessage('VALIDATION_ONLY_ALPHA_NUM') : undefined;

export const Validate = {
	require: (message) => (value) => fieldValidationRequired(value, message),
	required: memoize((message) => (value) => fieldValidationRequired(value, message)),
	maxLength: memoize((length) => (value) => fieldValidationLength(value, length)),
	maxLimit: memoize((minlength, maxLength) => (value) => fieldValidationForMaxLimit(value, minlength, maxLength))
};

export const CheckConstraints = (id: string) => {
	let isExists: boolean = false;
	if (PreliminaryComponentField.InsurranceCost == id) {
		isExists = true;
	} else if (PreliminaryComponentField.CBRELABOUR == id) {
		isExists = true;
	}
	return isExists;
};
export const isLumpSumOrCBRELabourExists = (id: string) => {
	let isExists: boolean = false;
	if (PreliminaryComponentField.Lump_Sum_Allowance == id || PreliminaryComponentField.CBRE_Labour == id) {
		isExists = true;
	}
	return isExists;
};
export const isLumpSumOrSubContractorExists = (id: string) => {
	let isExists: boolean = false;
	if (PreliminaryComponentField.Lump_Sum_Allowance == id || PreliminaryComponentField.Sub_Contractor == id) {
		isExists = true;
	}
	return isExists;
};
export const isCBRELabourOrAgencyLabourExists = (id: string) => {
	let isExists: boolean = false;
	if (PreliminaryComponentField.CBRE_Labour != id && PreliminaryComponentField.Agency_Labour != id) {
		isExists = true;
	}
	return isExists;
};
export const OnlyDistinctAssetTypes = (value, allValues, props, name) => {
	if (value === 0) {
		return;
	}
	else if (value && allValues) {
		switch (name) {
			case 'firstAssetWorkedOn':
				if (CheckIfValueExistsinArray(value, [allValues.secondAssetWorkedOn, allValues.thirdAssetWorkedOn]))
					return formatMessage('ASSET_ALREADY_SELECTED_VALIDATION_KEY');
				return null;
			case 'secondAssetWorkedOn':
				if (CheckIfValueExistsinArray(value, [allValues.firstAssetWorkedOn, allValues.thirdAssetWorkedOn]))
					return formatMessage('ASSET_ALREADY_SELECTED_VALIDATION_KEY');
				return null;
			case 'thirdAssetWorkedOn':
				if (CheckIfValueExistsinArray(value, [allValues.secondAssetWorkedOn, allValues.firstAssetWorkedOn]))
					return formatMessage('ASSET_ALREADY_SELECTED_VALIDATION_KEY');
				return null;
		}
		return null;
	}
	return null;
};

const CheckIfValueExistsinArray = (val: string, arr: Array<string>) => {
	return arr.indexOf(val) > -1;
}
export const isValidEmail = (email: string) => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const onErrorScrollToField = (errors) => {
	const errElm = document.getElementsByName(Object.keys(errors)[0])[0];
	if (errElm) {
		errElm.focus();
	} else {
		//For typeahead
		setTimeout(() => {
			const key = Object.keys(errors)[0];
			const id = key.includes('.') ? key.split('.')[key.split('.').length - 1] : key;
			const errElm = document.getElementById(id + '_error');
			const closestElement = errElm?.parentElement?.getElementsByTagName('input')[0];
			closestElement?.focus();
		}, 10);
	}
}