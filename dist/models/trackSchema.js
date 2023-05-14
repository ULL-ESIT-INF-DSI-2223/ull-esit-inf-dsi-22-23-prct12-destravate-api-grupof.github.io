import { Schema, model } from 'mongoose';
const trackSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    startCoords: {
        type: String,
        required: true,
    },
    endCoords: {
        type: String,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    },
    unevenness: {
        type: Number,
        required: true,
    },
    activities: {
        type: String,
        required: true,
    },
    finalized: [{
            type: Schema.Types.ObjectId,
            ref: "users"
        }],
    calification: {
        type: Number,
        required: true,
    }
});
export const trackModel = model('tracks', trackSchema);
