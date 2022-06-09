import mongoose from 'mongoose';
import { UserDocument } from './user.model';
import { FlightDepartureArrivalData, InternalFlightDepartureArrivalData } from '../schema/flight.schema';

export interface FlightDocument extends mongoose.Document {
  user: UserDocument['_id'];
  flightDate: string;
  flightIaco: string;
  airlineName: string;
  airlineIcao: string;
  departureAirportName: string;
  departureAirportIcao: string;
  departureTime: string;
  departureTerminal: string;
  departureGate: string;
  arrivalAirportName: string;
  arrivalAirportIcao: string;
  arrivalTime: string;
  arrivalTerminal: string;
  arrivalGate: string;
  creatdAt: Date;
  updatedAt: Date;
}

const FlightSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    flightDate: { type: String, required: true },
    flightIaco: { type: String, required: true },
    airlineName: { type: String, required: true },
    airlineIcao: { type: String, required: true },
    departureAirportName: { type: String, required: true },
    departureAirportIcao: { type: String, required: true },
    departureTime: { type: String, required: true },
    departureTerminal: { type: String, required: true },
    departureGate: { type: String, required: true },
    arrivalAirportName: { type: String, required: true },
    arrivalAirportIcao: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    arrivalTerminal: { type: String, required: true },
    arrivalGate: { type: String, required: true },

  },
  { timestamps: true }
);

const Flight = mongoose.model<FlightDocument>('Flight', FlightSchema);
export default Flight;

export const mapFlightData = (flightData: Array<FlightDepartureArrivalData>): InternalFlightDepartureArrivalData => {
  const [ departureData, arrivalData ] = flightData;
  const { 
    flight_date: dep_flight_date,
    flight_status: dep_flight_status,
    airline: dep_airline,
    flight: dep_flight,
    departure
  } = departureData;
  const { 
    flight_date: arr_flight_date,
    flight_status: arr_flight_status,
    airline: arr_airline,
    flight: arr_flight,
    arrival
  } = arrivalData;

  return {
    departure: {
      flight_date: dep_flight_date,
      airport: departure?.airport,
      iata: departure?.iata,
      icao: departure?.icao,
      airline_name: dep_airline.name,
      flight_icao: dep_flight.icao,
      airline_icao: dep_airline.icao,
      terminal: departure?.terminal,
      gate: departure?.gate,
      scheduled: departure?.scheduled,
      flight_status: dep_flight_status,
    },
    arrival: {
      flight_date: arr_flight_date,
      airport: arrival?.airport,
      iata: arrival?.iata,
      icao: arrival?.icao,
      flight_icao: arr_flight.icao,
      airline_name: arr_airline.name,
      airline_icao: arr_airline.icao,
      terminal: arrival?.terminal,
      gate: arrival?.gate,
      scheduled: arrival?.scheduled,
      flight_status: arr_flight_status,
    }
  }
}
