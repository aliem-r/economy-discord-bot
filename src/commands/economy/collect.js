import ms from "ms";
import { createUser, getUser } from "../../db/user.js";
import { dailyReward } from "../../settings.js";
import { formatBalance } from "../../utils.js";
import { createCooldown, getCooldown } from "../../db/cooldown.js";

export async function run({ interaction }) {
    try {
        await interaction.deferReply();

        const commandName = data.name;
        const userId = interaction.user.id;
        const endsAt = new Date(Date.now() + ms(dailyReward.cooldown));
        endsAt.setHours(1, 0, 0, 0);
        const currentDate = new Date();
        currentDate.setHours(1, 0, 0, 0);

        let user = await getUser(userId);
        if (!user) {
            user = await createUser(userId);
        }

        let cooldown = await getCooldown(commandName, userId);
        if (cooldown && cooldown.endsAt > currentDate) {
            interaction.editReply(
                "Daily already collected. Try again tomorrow!"
            );
            return;
        }

        if (!cooldown) {
            cooldown = await createCooldown(commandName, userId);
        }

        user.balance += dailyReward.amount;
        cooldown.endsAt = endsAt;

        await Promise.all([user.save(), cooldown.save()]);

        interaction.editReply(
            `${formatBalance(
                dailyReward.amount
            )} collected!\n🔹New balance: ${formatBalance(user.balance)}`
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
