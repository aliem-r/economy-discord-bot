// Gets a random number between min and max
export function getRandomNumber(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Rolls a chance based on a percentage. rollChance(60) will return true 60% of the time
export function rollChance(percent) {
    const randomNumber = getRandomNumber();
    return randomNumber < percent;
}

// Formats a number as a currency
export function formatBalance(amount) {
    return `**${amount.toLocaleString()} €**`;
}
