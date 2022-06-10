import axios from 'axios';
import config from 'config';

export const getAxiosInstance = () => {
  return axios.create({
    baseURL: config.get('aviationStackBaseURL') as string,
    params: {
      access_key: config.get('aviationStackAPIKey') as string,
    }
  });
}