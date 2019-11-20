import axios from 'axios';

export const baseAPI = axios.create({
  baseURL: 'https://localhost:44379/api/'
});
