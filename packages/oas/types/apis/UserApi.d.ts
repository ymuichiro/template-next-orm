import * as runtime from '../runtime';
import type { GetUsersResponseInner } from '../models';
export declare class UserApi extends runtime.BaseAPI {
    getUsersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetUsersResponseInner>>;
    getUsers(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetUsersResponseInner>;
}
