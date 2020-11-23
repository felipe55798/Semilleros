import { Department } from './department';
import { Group } from './group';
import { Program } from './program';
import { Role } from './role';
import { Seedling } from './seedling';

export interface User {
    id?:number,
    name?:string,
    lastname?:string,
    cellphone?:string,
    email?:string,
    password?:string,
    password_confirmation?:string,
    roles?:Role[],
    seedlings?:Seedling[],
    assigned_seedlings?:Seedling[],
    department?:Department,
    program?:Program,
    program_id?:number,
    role_id?:number,
    department_id?:number,
    groups?: Group[]
}