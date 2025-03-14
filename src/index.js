import { Client, GatewayIntentBits } from "discord.js";
import { CommandKit } from "commandkit";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

new CommandKit({
    client: client,
    eventsPath: `${__dirname}/events`,
    commandsPath: `${__dirname}/commands`,
});

client.login(process.env.TOKEN);
