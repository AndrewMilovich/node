import mongoose, { Schema, model } from 'mongoose';
import { teacherModel } from './teacher';

const studentSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        unique: true,
        lowercase: true,
        trim: true,
        type: String,
    },
    age: {
        type: Number,
    },
    teacher: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: teacherModel,
    }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// eslint-disable-next-line func-names
studentSchema.virtual('fullName').get(function () {
    // @ts-ignore
    // eslint-disable-next-line no-useless-concat
    return `${this.name}` + ' ' + 'krasavchuk';
});
export const studentModel = model('student', studentSchema);
