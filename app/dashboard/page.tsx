"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthService } from "../services/Auth";
import Loading from "@/components/loading";
import { getMutualGuilds } from "../services/discord";

export default function DashboardPage() {
    const [_isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedServer, setSelectedServer] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            const authStatus = await AuthService.checkAuthStatus();
            if (!authStatus) {
                router.push("/");
            } else {
                setIsAuthenticated(true);
                setLoading(false);
            }
        };
        getMutualGuilds();
        checkAuthentication();
    }, [router]);

    if (loading) {
        return <Loading />;
    }

    const handleServerChange = (serverName: string) => {
        setSelectedServer(serverName);
        router.push(`/dashboard/${serverName}`);
    };

    return (
        <SidebarProvider>
            <AppSidebar setSelectedServer={handleServerChange} router={router} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Catto Coffee
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {selectedServer || "Server Settings"}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    </div>
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
