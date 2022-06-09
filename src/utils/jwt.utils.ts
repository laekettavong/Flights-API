import jwt from 'jsonwebtoken';
import config from 'config';
import log from '../logger';

interface Verified {
  valid: boolean;
  expired: boolean;
  decoded: unknown;
}

export const sign = (object: Record<string, unknown>, options?: jwt.SignOptions): string | undefined => {
  try{
    return jwt.sign( object, config.get('jwtPrivateKey'), {...options} );
  }catch(error){
    log.error({ error });
  }
}

export const verify = (token: string): Verified => {
  try{
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    return {
      valid: true,
      expired: false,
      decoded
    };
  }catch(error){
    log.error({ error });
    return {
      valid: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expired: error.message === 'jwt expired',
      decoded: null
    };
  }
}