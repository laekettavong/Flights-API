import { Request, Response } from 'express';
import { getFlightForToday } from '../service/flight.service';
import log from '../logger';
import { get } from 'lodash';

import {
  createFlight,
  deleteFlight,
  findFlight,
  findAndUpdateFlight,
} from '../service/flight.service';


export const getRealTimeFlight = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { airline_icao, flight_icao } = request.query;
    if(!airline_icao || !flight_icao) {
      return response.status(400).send('Request must include airline_icao and flight_icao');
    }
    const flight = await getFlightForToday(airline_icao as string, flight_icao as string);
    return response.status(200).send(flight);
  }catch(error){
    log.error(error);
    return response.status(500).send('Error while fetching flight data from aviationstack API');
  }
}

export const createFlightHandler = async (request: Request, response: Response): Promise<Response> => {
  const userId = get(request, 'user._id');
  const body = request.body;
  const post = await createFlight({ ...body, user: userId });
  return response.send(post);
}

export const updateFlightHandler = async (request: Request, response: Response): Promise<Response> => {
  const userId = get(request, 'user._id');
  const flightId = get(request, 'params.flightId');
  const { body: updatePayload } = request;
  const flight = await findFlight(flightId);
  if (!flight) {
    return response.sendStatus(404);
  }

  if (String(flight.user) !== userId) {
    return response.sendStatus(401);
  }

  const updatedFlight = await findAndUpdateFlight({ _id: flightId }, updatePayload, { new: true });
  return response.send(updatedFlight);
}

export const getFlightHandler = async (request: Request, response: Response): Promise<Response> => {
  const flightId = get(request, 'params.flightId');
  const flight = await findFlight(flightId);
  const userId = get(request, 'user._id');
  if (!flight) {
    return response.sendStatus(404);
  }

  if (String(flight.user) !== String(userId)) {
    return response.sendStatus(401);
  }

  return response.send(flight);
}

export const deleteFlightHandler = async (request: Request, response: Response): Promise<Response> => {
  const userId = get(request, 'user._id');
  const flightId = get(request, 'params.flightId');
  const flight = await findFlight(flightId);

  if (!flight) {
    return response.sendStatus(404);
  }

  if (String(flight.user) !== String(userId)) {
    return response.sendStatus(401);
  }

  await deleteFlight({  _id: flightId  });
  return response.sendStatus(200);
}