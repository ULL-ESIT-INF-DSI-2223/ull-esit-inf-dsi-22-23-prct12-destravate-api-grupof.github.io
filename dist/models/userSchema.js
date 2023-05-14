import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    activities: {
        type: String,
        required: true,
    },
    friends: [{
            type: Schema.Types.ObjectId,
            ref: "users"
        }],
    historicTracks: [{
            date: {
                type: Date,
            },
            track: {
                type: Schema.Types.ObjectId,
                ref: "tracks",
            }
        }]
});
export const userModel = model('users', userSchema);
