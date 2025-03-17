import { Cooldown } from "../../schemas/Cooldown.js";

export async function createCooldown(commandName, userId, endsAt = Date.now()) {
    const cooldown = new Cooldown({ commandName, userId, endsAt });
    await cooldown.save();
    return cooldown;
}

export async function getCooldown(commandName, userId) {
    return await Cooldown.findOne({ commandName, userId });
}
