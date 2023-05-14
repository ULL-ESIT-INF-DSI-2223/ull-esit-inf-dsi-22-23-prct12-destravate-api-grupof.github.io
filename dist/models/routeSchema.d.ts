/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose/types/inferschematype.js" />
import { Schema, Document } from 'mongoose';
interface routeDocumentInterface extends Document {
    id: string;
    name: string;
    start: string;
    end: string;
    length: number;
    slope: number;
    users: {
        _id: Schema.Types.ObjectId;
    }[];
    activity: "Correr" | "Bicicleta";
    rating: number;
}
export declare const routeModel: import("mongoose").Model<routeDocumentInterface, {}, {}, {}, Document<unknown, {}, routeDocumentInterface> & Omit<routeDocumentInterface & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>;
export {};
