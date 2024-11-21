import * as React from "react";
import { useRouter } from "next/router"; // Import Next.js router
import { ChevronRight } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { ServerSwitcher } from "./server-switcher";
import { useFetchGuilds } from "@/hooks/useFetchGuilds";
import Loading from "./loading";
import { SidebarData } from "@/app/temp/data";

export function AppSidebar({
    setSelectedServer,
    router, // Accept router as a prop
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    setSelectedServer: (server: string) => void;
    router: any; // Type for Next.js router
}) {
    const { guilds, loading, error } = useFetchGuilds();
    const [selectedGuild, setSelectedGuild] = React.useState(guilds?.[0] || null);

    React.useEffect(() => {
        if (guilds?.length > 0) {
            setSelectedGuild(guilds[0]);
            updateURL(guilds[0].id);
        }
    }, [guilds]);

    const handleServerChange = (guildId: string) => {
        const guild = guilds.find((g) => g.id === guildId);
        if (guild) {
            setSelectedGuild(guild);
            setSelectedServer(guild.name);
            updateURL(guild.id);
        }
    };

    const updateURL = (guildId: string) => {
        router.push(`/dashboard/${guildId}`);
    };

    const handleNavigation = (guildId: string, sectionUrl: string) => {
        router.push(`/dashboard/${guildId}${sectionUrl}`);
    };

    if (loading) {
        return (
            <Sidebar {...props}>
                <SidebarHeader>
                    <div>
                        <Loading />
                    </div>
                </SidebarHeader>
            </Sidebar>
        );
    }

    if (error) {
        return (
            <Sidebar {...props}>
                <SidebarHeader>
                    <div>{error}</div>
                </SidebarHeader>
            </Sidebar>
        );
    }

    if (!guilds || guilds.length === 0) {
        return (
            <Sidebar {...props}>
                <SidebarHeader>
                    <div>No guilds available</div>
                </SidebarHeader>
            </Sidebar>
        );
    }

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <ServerSwitcher
                    guilds={guilds}
                    defaultGuildId={selectedGuild?.id || ""}
                    onServerChange={handleServerChange}
                />
            </SidebarHeader>
            <SidebarContent className="gap-0">
                {SidebarData.navMain.map((section, index) => (
                    <Collapsible key={index} title={section.title} defaultOpen={false}>
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                <CollapsibleTrigger className="flex items-center gap-2">
                                    {section.icon && <section.icon className="w-5 h-5" />}
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]:rotate-90" />
                                    <span>{section.title}</span>
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {section.items.map((item, idx) => (
                                            <SidebarMenuItem key={idx}>
                                                <SidebarMenuButton
                                                    asChild
                                                    onClick={() =>
                                                        handleNavigation(
                                                            selectedGuild?.id || "",
                                                            item.url
                                                        )
                                                    }
                                                >
                                                    <a href="#">{item.title}</a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
