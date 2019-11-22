import { baseAPI } from '../../src/client';

const getLanugaes = () => {
  return baseAPI.get('/api/LookupData/GetLanguages');
};
const getUserPreferences = () => {
  return baseAPI.get('/api/Users/getUserPreferences');
};

export { getUserPreferences, getLanugaes };
