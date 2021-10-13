import { ResponseError } from 'types/error';

export const handleError = (err: any): ResponseError => {
  const { message, code, name, statusCode } = err.response.data;
  return {
    message,
    code,
    name,
    statusCode,
  };
};
