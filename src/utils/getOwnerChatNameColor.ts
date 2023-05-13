import { SHA256 } from "crypto-js";

const colors = ["green-400", "orange-400", "blue-400", "orange-400", "lime-500"];

export default function getOwnerChatNameColor(id: string) {
    const hash = SHA256(id).toString();
    const index = parseInt(hash.slice(0, 2), 16) % colors.length;
    console.log(index)
    const color = colors[index];
    colors.splice(index, 1);
    return color;
}