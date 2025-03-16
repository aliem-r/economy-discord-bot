import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const User = model("User", userSchema);
