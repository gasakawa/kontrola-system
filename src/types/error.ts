export type ResponseError = {
  message: string;
  statusCode: number;
  internalCode?: string;
  name: string;
};
