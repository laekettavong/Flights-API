import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import log from '../logger';

const validate = (schema: AnySchema) => async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await schema.validate({
      body: request.body,
      query: request.query,
      params: request.params,
    });
    return next();
  }catch(error){
    log.error(error);
    return response.status(400).send(error)
  }
}

export default validate;