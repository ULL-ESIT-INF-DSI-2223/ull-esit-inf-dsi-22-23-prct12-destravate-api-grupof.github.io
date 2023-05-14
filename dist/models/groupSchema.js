import { Schema, model } from 'mongoose';
const groupSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    participants: [{
            date: {
                type: Date,
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: "users",
            }
        }],
    historicTracks: [{
            date: {
                type: Date,
            },
            track: {
                type: Schema.Types.ObjectId,
                ref: "tracks",
            }
        }],
});
export const groupModel = model('groups', groupSchema);
