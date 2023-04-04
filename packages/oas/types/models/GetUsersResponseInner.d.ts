/**
 * Swagger Sample - OpenAPI 3.0
 * sample
 *
 * The version of the OpenAPI document: 1.0.11
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import type { User } from './User';
/**
 *
 * @export
 * @interface GetUsersResponseInner
 */
export interface GetUsersResponseInner {
    /**
     *
     * @type {Array<User>}
     * @memberof GetUsersResponseInner
     */
    data: Array<User>;
}
/**
 * Check if a given object implements the GetUsersResponseInner interface.
 */
export declare function instanceOfGetUsersResponseInner(value: object): boolean;
export declare function GetUsersResponseInnerFromJSON(json: any): GetUsersResponseInner;
export declare function GetUsersResponseInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetUsersResponseInner;
export declare function GetUsersResponseInnerToJSON(value?: GetUsersResponseInner | null): any;
