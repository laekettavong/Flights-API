
import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

const deserializeUser = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
  try{
    const accessToken = get(request, 'headers.authorization', '').replace(/^Bearer\s/, '');
    if(!accessToken) return next();
    const { decoded } = verify(accessToken);
    if(decoded){
      const refreshToken = get(request, 'headers.x-refresh');
      if(refreshToken) {
        const newAccessToken = await reIssueAccessToken(refreshToken);
        if(newAccessToken) {
          response.set('x-access-token', newAccessToken);
          const { decoded } = verify(newAccessToken);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          request.user = decoded;
          return next();
        }
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      request.user = decoded;
      return next();
    }
    return next();
  }catch(error){
    return response.sendStatus(403);
  }
}

export default deserializeUser;