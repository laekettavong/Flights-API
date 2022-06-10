import url from 'url';
import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import Flight, { FlightDocument, mapFlightData } from '../model/flight.model';
import { getAxiosInstance } from '../utils/axios.utils';
import type { FlightDepartureArrivalPayload, InternalFlightDepartureArrivalData } from '../schema/flight.schema';

const getFlightData = (flightDepartureArrivalPayload: FlightDepartureArrivalPayload): InternalFlightDepartureArrivalData => {
  const { data } = flightDepartureArrivalPayload;
  return mapFlightData(data);
}

// the free aviationstack API plan does not support flight date search, hence this method only supports today's flights
export const getFlightForToday = async (
  airlineICAOCode: string,
  flightICAOCode: string
): Promise<InternalFlightDepartureArrivalData> => {
  const instance = getAxiosInstance();
  const params = new url.URLSearchParams({
    airline_icao: airlineICAOCode, // 'DAL',
    flight_icao: flightICAOCode, // 'DAL420'
    // search by flight date
    // flight_date: YYYY-MM-DD,
  });

  const res = await instance.get(`/v1/flights?${params}`);
  return getFlightData(res.data);
}

export const createFlight = async (input: DocumentDefinition<FlightDocument>): Promise<FlightDocument> => {
  return await Flight.create(input);
}

export const findFlight = async ( flightId: string ): Promise<FlightDocument | null> => {
 return await Flight.findById(flightId);
}

export const findAndUpdateFlight = async (
  query: FilterQuery<FlightDocument>,
  update: UpdateQuery<FlightDocument>,
  options: QueryOptions
): Promise<FlightDocument | null> => {
  return await Flight.findOneAndUpdate(query, update, options);
}

export const deleteFlight = async (query: FilterQuery<FlightDocument>): Promise<unknown> => {
  return await Flight.deleteOne(query);
}