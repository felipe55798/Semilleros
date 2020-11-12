import { User } from './user';

export interface Program {
    name?:string,
    description?:string,
    id?:number,
    department_id?:number,
    updated_at?: Date,
    created_at?: Date,
    coordinator_id?:User
}
