import { ApplicationCommandOptionType } from "discord.js";
import { createUser, getUser } from "../../repository/user";
import { formatBalance } from "../../utils";

export async function run({ interaction }) {
    try {
        await interaction.deferReply();

        const selectedUser = interaction.options.getUser("user");
        if (selectedUser?.bot) {
            interaction.editReply("You can't check the balance of a bot");
            return;
        }

        const userId = selectedUser?.id ?? interaction.user.id;
        let user = await getUser(userId, "userId balance");
        if (!user) {
            user = await createUser(userId);
        }

        interaction.editReply(
            user.userId === interaction.user.id
                ? `Your balance is: ${formatBalance(user.balance)}`
                : `The balance of <@${user.userId}> is: ${formatBalance(
                      user.balance
                  )}`
        );
    } catch (error) {
        console.log(`⭕ Error handling /balance: ${error}`);
    }
}

export const data = {
    name: "balance",
    description: "Check the balance of a user",
    options: [
        {
            name: "user",
            description: "The user to check the balance of",
            type: ApplicationCommandOptionType.User,
        },
    ],
};

export const options = {
    deleted: false,
};
