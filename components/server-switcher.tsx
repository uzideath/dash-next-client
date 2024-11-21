"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PartialGuild } from "@/app/utils/types";

export function ServerSwitcher({
    guilds,
    defaultGuildId,
    onServerChange,
}: {
    guilds: PartialGuild[];
    defaultGuildId: string;
    onServerChange: (guildId: string) => void;
}) {
    const [selectedGuildId, setSelectedGuildId] = React.useState(defaultGuildId);

    const selectedGuild = guilds.find((guild) => guild.id === selectedGuildId);

    React.useEffect(() => {
        if (selectedGuildId) {
            onServerChange(selectedGuildId);
        }
    }, [selectedGuildId, onServerChange]);

    const getGuildIconUrl = (guild: PartialGuild | undefined): string | undefined => {
        if (guild?.icon) {
            return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
        }
        return undefined;
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    {selectedGuild ? (
                                        <AvatarImage
                                            src={getGuildIconUrl(selectedGuild)}
                                            alt={selectedGuild.name}
                                        />
                                    ) : (
                                        <AvatarFallback>?</AvatarFallback>
                                    )}
                                </Avatar>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        {selectedGuild?.name || "Select a Guild"}
                                    </span>
                                </div>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width]"
                        align="start"
                    >
                        {guilds.length > 0 ? (
                            guilds.map((guild) => (
                                <DropdownMenuItem
                                    key={guild.id}
                                    onSelect={() => setSelectedGuildId(guild.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src={getGuildIconUrl(guild)}
                                                alt={guild.name}
                                            />
                                            <AvatarFallback>
                                                {guild.name.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>{guild.name}</span>
                                        {guild.id === selectedGuildId && <Check className="ml-auto" />}
                                    </div>
                                </DropdownMenuItem>
                            ))
                        ) : (
                            <DropdownMenuItem disabled>
                                <span>No Guilds Available</span>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
