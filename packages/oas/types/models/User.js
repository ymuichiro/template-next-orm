import { exists } from '../runtime';
export function instanceOfUser(value) {
    var isInstance = true;
    isInstance = isInstance && "id" in value;
    return isInstance;
}
export function UserFromJSON(json) {
    return UserFromJSONTyped(json, false);
}
export function UserFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'id': json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'image': !exists(json, 'image') ? undefined : json['image'],
    };
}
export function UserToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'id': value.id,
        'name': value.name,
        'image': value.image,
    };
}
