import { Request, Response } from 'express';
import { getAirlines } from '../service/airline.service'
import log from '../logger';

export const getAirlinesHandler = async (request: Request, response: Response): Promise<Response> => {
  try {
    const airlines = await getAirlines();
    return response.status(200).send(airlines);
  }catch(error){
    log.error(error);
    return response.status(500).send('Error while fetching airline data from aviationstack API');
  }
}