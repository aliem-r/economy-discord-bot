// Economy
export const dailyConfig = {
    amount: 50,
    cooldown: "1d",
};
export const begConfig = {
    min: 10,
    max: 50,
    chance: 40,
    cooldown: "1h",
};

// Games
export const slotsConfig = {
    min: 100,
    symbols: [
        "💎",
        "7️⃣",
        "7️⃣",
        "🍇",
        "🍇",
        "🍇",
        "🍋",
        "🍋",
        "🍋",
        "🍒",
        "🍒",
        "🍒",
    ],
    multis: {
        "💎": [2, 10, 50],
        "7️⃣": [1, 5, 15],
        "🍇": [0, 1, 5],
        "🍋": [0, 1, 5],
        "🍒": [0, 1, 5],
    },
};
