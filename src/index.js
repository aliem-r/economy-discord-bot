import { Client, GatewayIntentBits } from "discord.js";

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// ready

bot.on("ready", () => {
    console.log("✅ Bot is ready");
});

bot.login(process.env.TOKEN);
