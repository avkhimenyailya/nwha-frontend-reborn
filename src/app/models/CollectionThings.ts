import {Thing} from "./Thing";

export interface CollectionThings {
    id?: number,
    profileId: number,
    name: string,
    things: Thing[]
}