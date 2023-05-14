import { Schema, model } from 'mongoose';
const challengeSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    tracks: [{
            type: Schema.Types.ObjectId,
            ref: "tracks",
        }],
    activity: {
        type: String,
    },
    users: [{
            type: Schema.Types.ObjectId,
            ref: "users",
        }],
});
export const challengeModel = model('challenges', challengeSchema);
