import ms from "ms";
import { Cooldown } from "../../../schemas/Cooldown";

export default function clearCooldowns() {
    setInterval(async () => {
        let counter = 0;
        try {
            const cooldowns = await Cooldown.find().select("endsAt");
            for (const cooldown of cooldowns) {
                if (cooldown.endsAt > Date.now()) continue;
                await Cooldown.deleteOne({ _id: cooldown._id });
                counter++;
            }
            if (counter > 0)
                console.log(
                    `🕒 Cleared ${counter} cooldown${counter !== 1 ? "s" : ""}`
                );
        } catch (error) {
            console.log(`⭕ Error clearing cooldowns: ${error}`);
        }
    }, ms("1h"));
}
