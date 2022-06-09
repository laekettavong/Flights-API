import { get } from 'lodash';
import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import { createAccessToken, createSession, findSessions, freshToken, updateSession } from '../service/session.service';

export const createUserSessionHandler = async (request: Request, response: Response): Promise<Response> => {
  // validate the email and password
  const user = await validatePassword(request.body);
  if(!user) {
    return response.status(401).send('Invalid username or password');
  }

  // create a session
  const session = await createSession(user._id, request.get('user-agent') || '')

  // create access token
  const accessToken = createAccessToken({ user, session });

  // create refresh token
  const refrestToken = freshToken(session);

  // send refresh & access token back
  return response.send({ accessToken, refrestToken });
}

export  const invalidateUserSessionHandler = async (request: Request, response: Response): Promise<Response> => {
  try{
    const sessionId = get(request, 'user.session');
    await updateSession({ _id: sessionId}, { valid: false });
    return response.sendStatus(200);
  }catch(error){
    return response.sendStatus(403);
  }
}

export const getUserSessionsHandler = async (request: Request, response: Response): Promise<Response> => {
  const userId = get(request, 'user._id');
  const sessions = await findSessions({ user: userId, valid: true });
  return response.send(sessions);
}