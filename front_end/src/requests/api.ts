import { MyMenu, Role, User } from "@/types/types";
import { ObjectID } from 'bson';
import request from './index'
export default {
    getMenus: ()=>request.get<MyMenu[]>("api/menu"),
    deleteMenu: (key:string)=>request.delete(`api/menu?key=${key}`),
    updateMenu: (key:string, data:object)=>request.patch(`api/menu?key=${key}`,data),
    getRoles: ()=>request.get<Role[]>("api/role"),
    deleteRole: (id:ObjectID)=>request.delete(`api/role/${id}`),
    updateRole: (id:ObjectID, data:object)=>request.patch(`api/role/${id}`,data),
    getUsers: ()=>request.get<User[]>("api/user"),
    deleteUser: (id:ObjectID)=>request.delete(`api/role/${id}`),
    updateUser: (id:ObjectID, data:object)=>request.patch(`api/role/${id}`,data),
}
