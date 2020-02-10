import { IAdminDefaults } from './IAdminDefault';

export interface IAdminState {
	adminDefaultValues: Array<IAdminDefaults>;
	error: string;
}
