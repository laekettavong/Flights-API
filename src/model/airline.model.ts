import { AirlineData, InternalAirlineData } from '../schema/airline.schema';

export const mapAirlineData = (airlineData: Array<AirlineData>): Array<InternalAirlineData> => {
  const airlines = airlineData.map( airline => {
    const {
      airline_name,
      iata_code,
      icao_code,
      country_name,
      country_iso2
    } = airline;

    return {
      airline_name,
      iata_code,
      icao_code,
      country_name,
      country_iso2
    }
  });
  return airlines;
}