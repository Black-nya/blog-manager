import { ObjectID } from 'bson';
export interface MyMenu {
    id: number;
    title: string;
    key: string;
    pagepermission?: number;
    children?: MyMenu[];
    grade?: number;
}
export interface Role {
    _id: ObjectID;
    id: number;
    roleName: string;
    roleType: number;
    rights:string[];
}
export interface User{
    _id: ObjectID;
    id: number;
    username: string;
    password: string;
    roleState: boolean;
    default: boolean;
    region: string;
    roleId: number;
}