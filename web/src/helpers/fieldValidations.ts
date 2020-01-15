import { memoize } from 'lodash';
import { formatMessage } from './../Translations/connectedIntlProvider';
import PreliminaryComponentField from '../enums/PreliminaryComponentFields';

export const onlyNumber = (value) => (value && isNaN(Number(value)) ? formatMessage('VALIDATION_NUMBER') : undefined);

export function fieldValidationLength(value, maxLength) {
	if (value && maxLength && value.length > maxLength) {
		return `${formatMessage('FIELD_VALIDATION_KEY', {
			0: formatMessage(maxLength)
		})}`;
	}
}

export function fieldValidationRequired(value, message) {
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
	maxLength: memoize((length) => (value) => fieldValidationLength(value, length))
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
export const OnlyDistinctAssetTypes = (first, second) => (value) => {
	if ((second > 0 && value > 0 && second === value) || (first > 0 && value > 0 && first === value)) {
		return formatMessage('ASSET_ALREADY_SELECTED_VALIDATION_KEY');
	}
};
export const isValidEmail = (email: string) => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};
