import { Schema, model } from "mongoose";

const cooldownSchema = new Schema(
    {
        commandName: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: String,
            required: true,
        },
        endsAt: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export const Cooldown = model("Cooldown", cooldownSchema);
