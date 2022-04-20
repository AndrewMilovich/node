import { Schema, model } from 'mongoose';

const usersSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        unique: true,
        lowercase: true,
        trim: true,
        type: String,
    },
    age: {
        type: Number,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

export const usersModel = model('users', usersSchema);
