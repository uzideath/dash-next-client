import { useState, useEffect } from "react";
import { PartialGuild } from "@/app/utils/types";
import { getMutualGuilds } from "@/app/services/discord";

export function useFetchGuilds() {
    const [guilds, setGuilds] = useState<PartialGuild[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchGuilds() {
            try {
                setLoading(true);
                const data = await getMutualGuilds();
                setGuilds(data);
            } catch (err) {
                console.error("Error fetching guilds:", err);
                setError("Failed to load guilds");
            } finally {
                setLoading(false);
            }
        }

        fetchGuilds();
    }, []);

    return { guilds, loading, error };
}
