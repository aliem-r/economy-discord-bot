import { createUser, getUser } from "../../db/user.js";
import { dailyReward } from "../../settings.js";
import { formatBalance } from "../../utils.js";

export async function run({ interaction }) {
    try {
        await interaction.deferReply();

        const userId = interaction.user.id;

        let user = await getUser(userId);

        if (user) {
            const lastDailyCollect = user.lastDailyCollect?.toDateString();
            const currentDate = new Date().toDateString();

            if (lastDailyCollect === currentDate) {
                interaction.editReply("You already collected today");
                return;
            }
        } else {
            user = await createUser(userId);
        }

        user.balance += dailyReward;
        user.lastDailyCollect = new Date();

        await user.save();

        interaction.editReply(
            `${formatBalance(
                dailyReward
            )} collected!\n New balance: ${formatBalance(user.balance)}`
        );
    } catch (error) {
        console.log(`⭕ Error handling /collect: ${error}`);
    }
}

export const data = {
    name: "collect",
    description: `Collects daily reward of ${formatBalance(dailyReward)}`,
};

export const options = {
    deleted: false,
};
