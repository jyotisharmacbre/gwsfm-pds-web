import { getFilterElementFromArray, getPropertyName, getLookupDescription, displayUserName } from "../../helpers/utility-helper";
import { LookupItems } from "../../helpers/constants";
import { formatMessage } from "../../Translations/connectedIntlProvider";
import moment from "moment";

export const formatDataToExportExcel = (data, allEmails, allClients, currencies, CurrencyObj, lookupDetails, dateFormat) => {
	let result: any = [];
	data.map(element => {

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
			[formatMessage('MESSAGE_PROJECT_NAME')]: element.name,
			[formatMessage('LABEL_LAST_UPDATE')]: element.lastModified ? moment(element.lastModified).format(dateFormat) : '',
			[formatMessage('LABEL_CLIENT_CUSTOMER')]: customerObj ? customerObj.customerName : element.contractorId,
			[formatMessage('LABEL_PROBABILITY_OF_WINING')]: `${element.probabilityOfWinning} %`,
			[formatMessage('LABEL_STATUS')]: getLookupDescription(
				lookupDetails,
				element.status,
				LookupItems.Project_Status
			),
			[formatMessage('LABEL_EXPECTED_START_DATE')]: element.commenceDate ? moment(element.commenceDate).format(dateFormat) : '',
			[formatMessage('LABEL_APPROX_VALUE')]: element.approxValue.toString().indexOf(currencySymbol) > -1 ? element.approxValue : `${currencySymbol}${element.approxValue}`,
			[formatMessage('LABEL_CONTRACT_TYPE')]: contractTypeID,
			[formatMessage('LABEL_CMD_NOTIFIABLE')]: element.cdmNotifiable ? formatMessage('LABEL_YES') : formatMessage('LABEL_NO'),
			[formatMessage('LABEL_SOLD_MARGIN')]: `${element.soldmargin ? element.soldmargin : 0} %`
		})
	})
	return result;
}