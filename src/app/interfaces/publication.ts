import { Group } from './group';
import { User } from './user';

export interface Publication {
    id?:number,
    references?:string,
    link?:string,
    group_id?:number,
    user_id?:number,
    updated_at?: Date,
    created_at?: Date,
    group?:Group;
    user?:User
}
