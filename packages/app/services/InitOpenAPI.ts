import { Configuration, UserApi, ResponseError as _ResponseError } from 'oas/types';
import type oas from 'oas/types/models';

export namespace client {
  const config = new Configuration();
  export type ResponseError = _ResponseError;
  export const userApi = new UserApi(config);
}

export { oas };
