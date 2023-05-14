import { Schema } from "mongoose";
export declare function historyFunction(historicTracks: any): number[];
export declare function favoriteRoutes(historicTracks: any): {
    id: string;
    name: string;
    count: number;
}[];
export declare function activeChallenges(challenges: any, id: string): {
    _id: Schema.Types.ObjectId;
    id: string;
    name: string;
}[];
export declare function challengeLongAndUnevennes(challenges: any[]): {
    challenge: any;
    kmTotal: number;
    unevenness: number;
}[];
export declare function groupClasificationUsers(participants: any, historicTracks: any): {
    byKms: {
        id: string;
        name: string;
        long: number;
        unevenness: number;
    }[];
    byUnevenness: {
        id: string;
        name: string;
        long: number;
        unevenness: number;
    }[];
};
export declare function getGroupForUser(groups: any, id: string): {
    id: string;
    name: string;
}[];
