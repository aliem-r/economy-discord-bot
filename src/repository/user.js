import { User } from "../../schemas/User.js";

export async function createUser(userId) {
    const user = new User({ userId });
    await user.save();
    return user;
}

export async function getUser(userId, select = "") {
    return await User.findOne({ userId })?.select(select);
}
