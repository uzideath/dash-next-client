"use client";

import React from "react";
import { useAuthHandler } from "./AuthHandler";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";

export default function HomeComponent() {
    const { isAuthenticated, loading, handleDiscordLogin } = useAuthHandler();

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Welcome to Our App</h1>
            {!isAuthenticated && (
                <Button onClick={handleDiscordLogin} className="mt-4">
                    <Mail className="mr-2 h-4 w-4" /> Log in with Discord
                </Button>
            )}
        </div>
    );
}
