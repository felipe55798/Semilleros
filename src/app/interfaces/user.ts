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
    program_id?:number
}