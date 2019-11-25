import axios from 'axios';

export const baseAPI = axios.create({
  baseURL: 'https://qat-pds-middletier.azurewebsites.net/'
});
