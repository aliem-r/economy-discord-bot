export const data = {
    name: "ping",
    description: "Replies with Pong!",
};

export function run({ interaction }) {
    interaction.reply(`:ping_pong: Pong!`);
}

export const options = {
    deleted: false,
};
