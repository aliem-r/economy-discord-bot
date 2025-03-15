import { Client, GatewayIntentBits } from "discord.js";
import { CommandKit } from "commandkit";
import mongoose from "mongoose";

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

// MongoDB Connection
(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB!");
})();

// Discord.js Client Login
client.login(process.env.TOKEN);
