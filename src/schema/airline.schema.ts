import type { PayloadPagination } from './flight.schema'

export interface AirlineData {
  id: string;
  fleet_average_age: string;
  airline_id: string;
  callsign: string;
  hub_code: string;
  iata_code: string;
  icao_code: string;
  country_iso2: string;
  date_founded: string;
  iata_prefix_accounting: string;
  airline_name: string;
  country_name: string;
  fleet_size: string;
  status: string;
  type: string;
}

export interface InternalAirlineData {
  airline_name: string;
  iata_code: string;
  icao_code: string;
  country_name: string;
  country_iso2: string;
}

export interface AirlineDataPayload {
  pagination: PayloadPagination;
  data: Array<AirlineData>;
}