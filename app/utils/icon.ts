import { PartialGuild } from "@/app/utils/types";

export const getIconURL = (guild: PartialGuild) =>
    `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;