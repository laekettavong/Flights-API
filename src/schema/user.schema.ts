import { object, string, ref } from 'yup';

export const createUserSchema = object({
  body: object({
    firstName: string().required('firstName is required'),
    lastName: string().required('lastName is required'),
    age: string().required('age is required'),
    password: string()
      .required('Password is rquired')
      .min(6, 'Password is too short, must be at least 6 characters long')
      .matches(/^[a-zA-Z0-9]*$/, 'Password can only contain alphanumberic characters'),
      passwordConfirmation: string().oneOf(
        [ref('password'), null],
        'Passwords must match'
      ),
      email: string()
        .required('Email is required')
        .email('Must be a valid email)')
  }),
});

export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required('Password is rquired')
      .min(6, 'Password is too short, must be at least 6 characters long')
      .matches(/^[a-zA-Z0-9]*$/, 'Password can only contain alphanumberic characters'),
      email: string()
        .required('Email is required')
        .email('Must be a valid email)')
  }),
});