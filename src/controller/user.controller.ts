import { omit } from 'lodash';
import { Request, Response } from 'express';
import { createUser } from '../service/user.service';
import log from '../logger';
export const createUserHandler = async (request: Request, response: Response): Promise<Response> => {
  try{
    const user = await createUser(request.body);
    return response.send(omit(user.toJSON(), 'password'));
  }catch(error) {
    log.error(error);
    return response.status(409).send('Error while creating user');
  }
}
