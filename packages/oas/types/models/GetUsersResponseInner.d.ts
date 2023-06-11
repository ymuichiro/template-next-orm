import type { User } from './User';
export interface GetUsersResponseInner {
    data: Array<User>;
}
export declare function instanceOfGetUsersResponseInner(value: object): boolean;
export declare function GetUsersResponseInnerFromJSON(json: any): GetUsersResponseInner;
export declare function GetUsersResponseInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetUsersResponseInner;
export declare function GetUsersResponseInnerToJSON(value?: GetUsersResponseInner | null): any;
