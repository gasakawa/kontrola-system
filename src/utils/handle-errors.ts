import { ResponseError } from 'types/error';

export const handleError = (err: any): ResponseError => {
  const { message, internalCode, name, statusCode } = err.response.data;
  return {
    message,
    internalCode,
    name,
    statusCode,
  };
};
