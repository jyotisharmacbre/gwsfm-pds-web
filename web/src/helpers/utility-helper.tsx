import React from 'react';
import ProjectStatus from '../enums/ProjectStatus';
import moment from 'moment';

export const updateObject = (oldState, updatedProperties) => {
	return {
		...oldState,
		...updatedProperties
	};
};

export const getPropertyName = (obj, expression) => {
	var res = {};
	Object.keys(obj).map((k) => {
		res[k] = () => k;
	});
	return expression(res)();
};

export const getLookupDescription = (allLookups, lookupKey, lookupItem) => {
	if (!allLookups || !lookupKey) return null;
	let filter = allLookups.find(
		(lk) => lk.lookupItem === lookupItem && lk.lookupKey.toString() === lookupKey.toString()
	);
	if (!filter || filter == undefined) return null;

	return filter.description;
};

export const getDropdown = (data, value) => {
	let result =
		data &&
		data.map((status: any, i: number) => {
			if (status.lookupItem == value) {
				return (
					<option key={status.lookupId} value={+status.lookupKey}>
						{status.description}
					</option>
				);
			}
		});
	return result;
};

export const getRadioOptions = (data, value) => {
	let result =
		data &&
		data.map((status: any, i: number) => {
			if (status.lookupItem == value) {
				return status;
			}
		});
	return result;
};

export const getDiscountTypeValue = (data, value, currency) => {
	let result =
		data &&
		data.map((dataValue: any, i: number) => {
			if (dataValue.lookupKey == value) {
				let arr = dataValue.description.split(' ');
				let arrValue = arr[1][1];
				if (arrValue == '#') {
					return currency;
				} else {
					return arrValue;
				}
			}
		});
	return result;
};

export const normalizeToNumber = (value) => (value = +value);

export const getFilterElementFromArray = (
	array: any,
	property: string,
	value: number | string,
	getproperty: string
) => {
	let element = '';
	let filter;
	if (array) {
		filter = array.find((ele) => ele[property] == value);
		if (filter != null && filter != undefined) element = filter[getproperty];
	}
	return element;
};

export const restrictMinus = (value: number) => {
	if (value < 0) {
		return 0;
	} else {
		return value;
	}
};
export const restrictMinusAndDecimal = (value: number) => {
  if (value < 0) {
    return 0;
  } else {
if((value - Math.floor(value)) != 0)
{
  return parseInt(value.toString());
}
    return value;
  }
};
export const isValidGUID = (stringToTest: string) => {
	var regexGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
	return regexGuid.test(stringToTest);
};

export const maxLimit = (value: number) => {
	if (value < 0) {
		return 0;
	} else if (value > 100) {
		return 100;
	} else {
		return value;
	}
};

export const maxLimitTo = (minLimit, maxLimit) => (value: number) => {
	if (value < minLimit) {
		return minLimit;
	} else if (value > maxLimit) {
		return maxLimit;
	} else {
		return value;
	}
};

export const calculateRank = (probabilityOfWinning: number, approximateValue: number) => {
	return probabilityOfWinning * approximateValue;
};

export const getClassNameForProjectStatus = (projectStatus: ProjectStatus) => {
	let className: string = '';
	if (
		projectStatus == ProjectStatus.BidLost ||
		projectStatus == ProjectStatus.OnHold ||
		projectStatus == ProjectStatus.InReview
	)
		className = 'link_disabled';
	return className;
};

export const disableIfProjectNotSubmitted = (projectStatus: ProjectStatus) => {
	let className: string = '';
	if (projectStatus != ProjectStatus.InReview) className = 'link_disabled';
	return className;
};

export const formatDate = (date: string) => {
	return moment(date).format('DD/MM/YYYY');
};

export const formatDateAndTime = (date: string) => {
	return moment(date).format('DD/MM/YYYY') + ' | ' + moment(date).format('hh:mm A');
};
