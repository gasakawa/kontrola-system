export type ResponseError = {
  message: string;
  statusCode: number;
  code: string;
  name: string;
};

export type FormError = {
  field: string;
  errorMessage: string;
};
