export interface User {
    id: string;
    name?: string;
    image?: string;
}
export declare function instanceOfUser(value: object): boolean;
export declare function UserFromJSON(json: any): User;
export declare function UserFromJSONTyped(json: any, ignoreDiscriminator: boolean): User;
export declare function UserToJSON(value?: User | null): any;
