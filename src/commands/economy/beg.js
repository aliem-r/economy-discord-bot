import ms from "ms";
import { createCooldown, getCooldown } from "../../db/cooldown";
import { createUser, getUser } from "../../db/user";
import { formatBalance, getRandomNumber, rollChance } from "../../utils";
import { begReward } from "../../settings";

export async function run({ interaction }) {
    try {
        await interaction.deferReply();

        const commandName = data.name;
        const userId = interaction.user.id;
        const endsAt = Date.now() + ms(begReward.cooldown);

        let cooldown = await getCooldown(commandName, userId);
        let user = await getUser(userId, "userId balance");

        if (cooldown && Date.now() < cooldown.endsAt) {
            interaction.editReply(
                `beg already used. Try again in ${ms(
                    cooldown.endsAt - Date.now()
                )}`
            );
            return;
        }

        if (!user) {
            user = await createUser(userId);
        }

        if (!cooldown) {
            cooldown = await createCooldown(commandName, userId);
        }

        if (rollChance(begReward.chance)) {
            const reward = getRandomNumber(begReward.min, begReward.max);
            user.balance += reward;
            await user.save();

            interaction.editReply(
                `You begged and got ${formatBalance(
                    reward
                )}\n🔹New balance: ${formatBalance(user.balance)}`
            );
        } else {
            interaction.editReply("You begged but got nothing");
        }
        cooldown.endsAt = endsAt;
        await cooldown.save();
    } catch (error) {
        console.log(`⭕ Error handling /beg: ${error}`);
    }
}

export const data = {
    name: "beg",
    description:
        "Beg for some coins. Chance: 40% | Reward: 10-50 | Cooldown: 1h",
};

export const options = {
    deleted: false,
};
