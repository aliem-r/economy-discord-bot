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
        const endsAt = Date.now() + ms(dailyReward.cooldown);

        let user = await getUser(userId);
        if (!user) {
            user = await createUser(userId);
        }

        let cooldown = await getCooldown(commandName, userId);
        if (cooldown && Date.now() < cooldown.endsAt) {
            interaction.editReply(
                `Daily already collected. Try again in ${ms(
                    cooldown.endsAt - Date.now()
                )}`
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
