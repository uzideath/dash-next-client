import axios, { AxiosRequestConfig } from 'axios';
import {
    GuildConfigType,
    PartialGuild
} from "../utils/types";

const CONFIG: AxiosRequestConfig = { withCredentials: true };

export const getMutualGuilds = async () => {
    try {
        const response = await axios.get<PartialGuild[]>('/discord/guilds', CONFIG);
        console.log('API Response:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error fetching mutual guilds:', error);
        throw error;
    }
};



export const getGuildConfig = (guildId: string) =>
    axios.get<GuildConfigType>(`/guilds/config/${guildId}`, CONFIG);

export const updateGuildPrefix = (guildId: string, prefix: string) =>
    axios.post(
        `/guilds/${guildId}/config/prefix`,
        {
            prefix,
        },
        CONFIG
    );

export const getGuildChannels = (guildId: string) =>
    axios.get(`discord/guilds/${guildId}/channels`, CONFIG);

