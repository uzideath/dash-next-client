import { Book, Star, Mic, FileText } from "lucide-react";

const data = {
    versions: ["Server 1", "Server 2", "Server 3"],
    avatars: {
        "Server 1": "/images/server1.png",
        "Server 2": "/images/server2.png",
        "Server 3": "/images/server3.png",
    },
    navMain: [
        {
            title: "Getting Started",
            url: "#",
            icon: Book,
            items: [
                {
                    title: "Overview",
                    url: "#",
                },
                {
                    title: "General information",
                    url: "#",
                },
            ],
        },
        {
            title: "Leveling",
            url: "#",
            icon: Star,
            items: [
                {
                    title: "Text Experience",
                    url: "#",
                },
                {
                    title: "Voice Experience",
                    url: "#",
                    isActive: true,
                },
                {
                    title: "Leaderboard",
                    url: "#",
                },
                {
                    title: "Profile",
                    url: "#",
                },
                {
                    title: "Rank Card",
                    url: "#",
                },
            ],
        },
        {
            title: "Voice Channels",
            url: "#",
            icon: Mic,
            items: [
                {
                    title: "Overview",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Logs",
            url: "#",
            icon: FileText,
            items: [
                {
                    title: "Overview",
                    url: "#",
                },
                {
                    title: "Set up",
                    url: "#",
                },
            ],
        },
    ],
};

export { data as SidebarData };
