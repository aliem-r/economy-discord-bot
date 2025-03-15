import { User } from "../../../schemas/User.js";
import settings from "../../settings.js";

export async function run({ interaction }) {
    try {
        await interaction.deferReply();

        let user = await User.findOne({ userId: interaction.user.id });

        if (user) {
            const lastDailyCollect = user.lastDailyCollect?.toDateString();
            const currentDate = new Date().toDateString();

            if (lastDailyCollect === currentDate) {
                interaction.editReply("You already collected today");
                return;
            }
        } else {
            user = new User({ userId: interaction.user.id });
        }

        user.balance += settings.dailyReward;
        user.lastDailyCollect = new Date();

        await user.save();

        interaction.editReply(
            `${settings.dailyReward}🪙 Collected!\n New balance: ${user.balance}`
        );
    } catch (error) {
        console.log(`⭕ Error handling /collect: ${error}`);
    }
}

export const data = {
    name: "collect",
    description: "Collects daily reward",
};

export const options = {
    deleted: false,
};
