import { Schema, model } from 'mongoose';
const routeSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    slope: {
        type: Number,
        required: true,
    },
    users: [{
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true
        }],
    activity: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});
export const routeModel = model('routes', routeSchema);
