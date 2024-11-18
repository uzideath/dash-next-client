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

export function ServerSwitcher({
    servers,
    defaultServer,
    avatars,
}: {
    servers: string[];
    defaultServer: string;
    avatars: { [key: string]: string }
}) {
    const [selectedServer, setSelectedServer] = React.useState(defaultServer);

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
                                    <AvatarImage src={avatars[selectedServer]} alt={selectedServer} />
                                    <AvatarFallback>
                                        {selectedServer.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Discord Servers</span>
                                    <span>{selectedServer}</span>
                                </div>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width]"
                        align="start"
                    >
                        {servers.map((server) => (
                            <DropdownMenuItem
                                key={server}
                                onSelect={() => setSelectedServer(server)}
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={avatars[server]} alt={server} />
                                        <AvatarFallback>
                                            {server.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{server}</span>
                                    {server === selectedServer && <Check className="ml-auto" />}
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
