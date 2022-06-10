import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import { 
  createFlightHandler,
  deleteFlightHandler,
  getFlightHandler,
  getRealTimeFlight,
  updateFlightHandler
 } from './controller/flight.controller';
import { 
  createUserSessionHandler,
  getUserSessionsHandler,
  invalidateUserSessionHandler, 
} from './controller/session.controller';
import { getAirlinesHandler } from './controller/airline.controller';
import { validateRequest, requiresUser } from './middleware';
import { createUserSchema, createUserSessionSchema  } from './schema/user.schema';
import { createFlightSchema, deleteFlightSchema, updateFlightSchema  } from './schema/flight.schema';

export default function(app: Express){
  app.get('/healthcheck', (request: Request, response: Response) => response.sendStatus(200));

  // create user
  app.post('/api/v1/users', validateRequest(createUserSchema), createUserHandler);

  // get the user's sessions
  app.get('/api/v1/sessions', requiresUser, getUserSessionsHandler);

  // login
  app.post('/api/v1/sessions',  validateRequest(createUserSessionSchema), createUserSessionHandler)

  // log out
  app.delete('/api/v1/sessions', requiresUser, invalidateUserSessionHandler)
  
  // get real-time flight using airline icao code and flight icao code
  app.get('/api/v1/flights', getRealTimeFlight);

  // book flight
  app.post('/api/v1/flights', [requiresUser, validateRequest(createFlightSchema)], createFlightHandler)

  // update a flight
  app.put('/api/v1/flights/:flightId', [requiresUser, validateRequest(updateFlightSchema)], updateFlightHandler)

  // get a flight
  app.get('/api/v1/flights/:flightId', requiresUser, getFlightHandler)

  // delete a flight
  app.delete('/api/v1/flights/:flightId',  [requiresUser, validateRequest(deleteFlightSchema)], deleteFlightHandler)

  // get airlines
  app.get('/api/v1/airlines', getAirlinesHandler);
}
