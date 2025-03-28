import ms from "ms";
import { createCooldown, getCooldown } from "../../repository/cooldown";
import { createUser, getUser } from "../../repository/user";
import { formatBalance, getRandomNumber, rollChance } from "../../utils";
import { begConfig } from "../../settings";

export async function run({ interaction }) {
    try {
        await interaction.deferReply();

        const commandName = data.name;
        const userId = interaction.user.id;
        const endsAt = Date.now() + ms(begConfig.cooldown);

        let user = await getUser(userId, "userId balance");
        if (!user) {
            user = await createUser(userId);
        }

        let cooldown = await getCooldown(commandName, userId);
        if (cooldown && Date.now() < cooldown.endsAt) {
            interaction.editReply(
                `Beg already used. Try again in ${ms(
                    cooldown.endsAt - Date.now()
                )}`
            );
            return;
        }

        if (!cooldown) {
            cooldown = await createCooldown(commandName, userId);
        }

        cooldown.endsAt = endsAt;
        await cooldown.save();

        if (rollChance(begConfig.chance)) {
            const reward = getRandomNumber(begConfig.min, begConfig.max);
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
    } catch (error) {
        console.log(`⭕ Error handling /beg: ${error}`);
    }
}

export const data = {
    name: "beg",
    description: `Beg for some coins. Chance: ${begConfig.chance}% | Reward: ${begConfig.min}-${begConfig.max} | Cooldown: ${begConfig.cooldown}`,
};

export const options = {
    deleted: false,
};
