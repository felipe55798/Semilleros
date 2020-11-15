import { Program } from './program';
import { Role } from './role';

export interface User {
    id?:number,
    name?:string,
    lastname?:string,
    cellphone?:string,
    email?:string,
    password?:string,
    password_confirmation?:string,
    roles?:Role[],
    program?:Program,
    program_id?:number,
    role_id?:number
}