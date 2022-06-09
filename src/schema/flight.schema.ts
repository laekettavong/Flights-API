import { object, string } from 'yup';

export const createFlightSchema = object({
  body: object({
    flightDate: string().required('flightDate is required'),
    airlineName: string().required('airlineName is required and must be valid airline name'),
    airlineIcao: string().required('airlineIcao is required and must be valid airline ICAO code'),
    flightIaco: string().required('flightIaco is required and must be valid flight ICAO code'),
    departureAirportName: string().required('departureAirportName is required and must be valid airport'),
    departureAirportIcao: string().required('departureAirportIcao is required and must be valid airport ICAO code'),
    departureTime: string().required('departureTime is required'),
    departureTerminal: string().required('departureTerminal is required'),
    departureGate: string().required('departureGate is required'),
    arrivalAirportName: string().required('arrivalAirportName is required and must be valid airport'),
    arrivalAirportIcao: string().required('arrivalAirportIcao is required and must be valid airport ICAO code'),
    arrivalTime: string().required('arrivalTime is required'),
    arrivalTerminal: string().required('arrivalTerminal is required'),
    arrivalGate: string().required('arrivalGate is required')
  }),
});

const updateDeleteFlightParams = {
  params: object({
    flightId: string().required('flightId is required'),
  }),
};

const updateFlightPayload = {
  body: object({
    flightDate: string().required('flightDate is required'),
    airlineIcao: string().required('airlineIcao is required'),
    flightIaco: string().required('airlineIcao is required'),
  }),
};

export const updateFlightSchema = object({
  ...updateDeleteFlightParams,
  ...updateFlightPayload,
});

export const deleteFlightSchema = object({
  ...updateDeleteFlightParams,
});


type StringOrNil = string | null | undefined;

interface FlightDepartureArrivalPagination {
  limit: number;
  offset: number;
  count: number;
  total: number;
}

interface DepartureArrivalData {
  airport: string;
  timezone: string;
  iata: string;
  icao: string;
  terminal: string;
  gate: string;
  delay: StringOrNil;
  scheduled: string;
  estimated: string;
  actual: StringOrNil;
  estimated_runway: StringOrNil;
  actual_runway: StringOrNil;
}

interface AirlineData {
  name: string;
  iata: string;
  icao: string;
}

interface FlightData {
  number: string;
  iata: string;
  icao: string;
  codeshared: StringOrNil;
}

export interface FlightDepartureArrivalData {
  flight_date: string;
  flight_status: string
  aircraft: StringOrNil;
  live: StringOrNil;
  departure?: DepartureArrivalData;
  arrival?: DepartureArrivalData;
  airline: AirlineData;
  flight: FlightData;
}

export interface FlightDepartureArrivalPayload {
  pagination: FlightDepartureArrivalPagination;
  data: Array<FlightDepartureArrivalData>;
}

interface InternalFlightData {
  airline_icao: string;
  airline_name: string;
  airport: StringOrNil;
  flight_date: string;
  flight_icao: string;
  flight_status: string;
  gate: StringOrNil;
  icao: StringOrNil;
  iata: StringOrNil;
  scheduled: StringOrNil;
  terminal: StringOrNil;
}

export interface InternalFlightDepartureArrivalData {
  departure: InternalFlightData;
  arrival: InternalFlightData;
}
