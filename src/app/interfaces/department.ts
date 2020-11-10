import { Group } from './group';
import { Program } from './program';

export interface Department {
    name?:string,
    description?:string,
    id?:number,
    updated_at?:Date,
    created_at?:Date,
    groups?:Group[],
    programs?:Program[]
}
