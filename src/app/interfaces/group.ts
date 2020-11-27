import { Line } from './line';
import { Publication } from './publication';
import { Seedling } from './seedling';

export interface Group {
    id?:number,
    department_id?:number,
    name?:string,
    description?:string,
    updated_at?: Date,
    created_at?: Date,
    seedlings?:Seedling[],
    publications?:Publication[],
    lines?:Line[]
}
