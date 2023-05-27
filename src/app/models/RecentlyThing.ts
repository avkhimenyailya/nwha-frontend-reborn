import {Thing} from "./Thing";

export interface RecentlyThing {
    thingId: number,
    taskOrdinalNumber: number,
    pictureLink: string,
    prettyTime: string,
    username: string
    thing?: Thing
}
