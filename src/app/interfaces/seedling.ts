import { Group } from './group';

export interface Seedling {
    id?:number,
    group_id?:number,
    name?:string,
    description?:string,
    updated_at?: Date,
    created_at?: Date,
    users?:[],
    teacher_id?:number,
    group?:Group
}
