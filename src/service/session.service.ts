import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import config from 'config';
import { LeanDocument, FilterQuery, UpdateQuery } from 'mongoose';
import Session, { SessionDocument } from '../model/session.model'
import { UserDocument } from '../model/user.model';
import { findUser } from '../service/user.service';
import { sign, verify } from '../utils/jwt.utils';
//import { findUser } from './user.service';
// src/service/session.service.ts

export const createSession  =async (userId: string, userAgent: string) => {
  const session = await Session.create( {user: userId, userAgent });
  return session.toJSON();
}

interface UserAccessToken {
  user:  Omit<UserDocument, 'password'> | LeanDocument<Omit<UserDocument, 'password'>>;
}

interface SessionAccessToken {
  session: Omit<SessionDocument, 'password'> | LeanDocument<Omit<SessionDocument, 'password'>> ;
}

interface AccessToken {
  user: Record<string, unknown> | UserAccessToken;
  session: Record<string, unknown> | SessionAccessToken | SessionDocument;
}

const isSessionDocument = (session: SessionDocument | Record<string, unknown> | SessionAccessToken): session is SessionDocument => {
  return (session as SessionDocument)._id !== undefined;
}

export const createAccessToken = ({ user, session }: AccessToken): string | undefined => {
  const sessionId = isSessionDocument(session) ? session._id : uuidv4();
  const accessToken = sign(
    { ...user, session: sessionId },
    { expiresIn: config.get('accessTokenTtl') }
  );
  return accessToken;
}

export const freshToken = (session: Record<string, unknown>): string | undefined => {
  return sign(session, {
    expiresIn: config.get('refreshTokenTtl'),
  })
}

export const reIssueAccessToken = async (refreshToken: string) => {
  const { decoded } = verify(refreshToken);
  if(!decoded || !get(decoded, '_id')) return false;
  const session = await Session.findById(get(decoded, '_id'));
  if(!session || !session.valid) return false;
  
  const user = await findUser({ _id: session.user });
  if(!user) return false;
  const accessToken = createAccessToken({ user, session: (session as SessionDocument) });
  return accessToken;
}

export const updateSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  return await Session.updateOne(query, update); 
}

export const findSessions = async (query: FilterQuery<SessionDocument>): Promise<SessionDocument> => {
  return await Session.find(query).lean();
}