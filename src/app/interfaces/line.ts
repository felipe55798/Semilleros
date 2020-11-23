import { Group } from './group';

export interface Line {
    id?:number,
    group_id?:number,
    name?:string,
    description?:string,
    updated_at?: Date,
    created_at?: Date,
    group?: Group
}
