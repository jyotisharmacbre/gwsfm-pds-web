import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';
import { IUserPreferencesState } from '../../../../store/UserPreferencesForm/Types/IUserPreferencesState';
import { isActive } from 'nock/types';
export const languages = [{ languageId: 1, languageName: 'english' }, { languageId: 2, languageName: 'french' }];
export const currencies = [{ currencyID: 1, currencySymbol: '$', currencyName: 'dollar', isActive: true }, { currencyID: 2, currencySymbol: 'f', currencyName: 'frenc', isActive: true, }];
export const initialState: IUserPreferencesState = {
    preferences: {
        userPreferenceId: '',
        languageId: 1,
        languageName: 'en',
        currencyId: 1,
        currencySymbol: '$',
        currencyName: 'Dollar'
    },
    error: null,
    loading: false,
    notify: Notify.none,
    event: EventType.none
};