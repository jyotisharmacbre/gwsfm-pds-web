import { getFilterElementFromArray, getPropertyName, getLookupDescription, displayUserName } from "../../helpers/utility-helper";
import { LookupItems } from "../../helpers/constants";
import { formatMessage } from "../../Translations/connectedIntlProvider";
import moment from "moment";

export const formatDataToExportExcel = (data, allEmails, allClients, currencies, CurrencyObj, lookupDetails, dateFormat) => {
	let result: any = [];
	data.map(element => {
		let mailObj = allEmails && element.projectOwner && allEmails.find(
			lk => lk.email && element.projectOwner && lk.email.toUpperCase() === element.projectOwner.toUpperCase()
		);
		let customerObj = allClients && element.contractorId && allClients.find(
			lk => lk.contractId && element.contractorId && lk.contractId.toUpperCase() === element.contractorId.toUpperCase()
		);
		const currencySymbol = getFilterElementFromArray(
			currencies,
			getPropertyName(CurrencyObj, (prop) => prop.currencyId),
			element.currencyId,
			getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
		);
		let contractTypeID = element.contractTypeId;
		if (contractTypeID > 0 && lookupDetails.length > 0)
			contractTypeID = getLookupDescription(
				lookupDetails,
				element.contractTypeId,
				LookupItems.ContractType
			);
		result.push({
			[formatMessage('MESSAGE_PROJECT_ID')]: element.projectRefId,
			[formatMessage('MESSAGE_PROJECT_NAME')]: element.name,
			[formatMessage('LABEL_HEAD_OF_PROJECT')]: mailObj
				? `${displayUserName(mailObj)}`
				: element.headOfProject,
			[formatMessage('LABEL_CLIENT_CUSTOMER')]: customerObj ? customerObj.customerName : element.contractorId,
			[formatMessage('LABEL_STATUS')]: getLookupDescription(
				lookupDetails,
				element.status,
				LookupItems.Project_Status
			),
			[formatMessage('LABEL_EXPECTED_START_DATE')]: element.commenceDate ? moment(element.commenceDate).format(dateFormat) : '',
			[formatMessage('LABEL_APPROX_VALUE')]: element.approxValue.toString().indexOf(currencySymbol) > -1 ? element.approxValue : `${currencySymbol}${element.approxValue}`,
		})
	})
	return result;
}