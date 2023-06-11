import { UserFromJSON, UserToJSON, } from './User';
export function instanceOfGetUsersResponseInner(value) {
    var isInstance = true;
    isInstance = isInstance && "data" in value;
    return isInstance;
}
export function GetUsersResponseInnerFromJSON(json) {
    return GetUsersResponseInnerFromJSONTyped(json, false);
}
export function GetUsersResponseInnerFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'data': (json['data'].map(UserFromJSON)),
    };
}
export function GetUsersResponseInnerToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'data': (value.data.map(UserToJSON)),
    };
}
