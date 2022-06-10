import { getAxiosInstance } from '../utils/axios.utils';
import { AirlineDataPayload, InternalAirlineData } from '../schema/airline.schema';
import { mapAirlineData } from '../model/airline.model';

const getAirlinetData = (airlinePayload: AirlineDataPayload): Array<InternalAirlineData> => {
  const { data } = airlinePayload;
  return mapAirlineData(data);
}

// the free aviationstack API plan does not support flight date search, hence this method only supports today's flights
export const getAirlines = async (): Promise<Array<InternalAirlineData>> => {
  const instance = getAxiosInstance();
  const res = await instance.get('/v1/airlines');
  return getAirlinetData(res.data);
}