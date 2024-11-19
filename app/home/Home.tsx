"use client";

import React, { useState } from "react";
import { useAuthHandler } from "./AuthHandler";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/button-loading";
import Loading from "@/components/loading";
import { PrimeIcons } from "primereact/api";

export default function HomeComponent() {
    const { isAuthenticated, loading, handleDiscordLogin } = useAuthHandler();
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const handleLoginClick = () => {
        setIsButtonLoading(true);
        setTimeout(() => {
            setIsButtonLoading(false);
            handleDiscordLogin();
        }, 1000);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Welcome to Our App</h1>
            {!isAuthenticated && (
                <div className="mt-5 flex items-center justify-center">
                    {isButtonLoading ? (
                        <ButtonLoading className="w-full" />
                    ) : (
                        <Button
                            onClick={handleLoginClick}
                            className="w-full flex items-center justify-center"
                        >
                            <i
                                className={`${PrimeIcons.DISCORD} mr-2`}
                                style={{ fontSize: "1.5rem" }}
                            />
                            Log in with Discord
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
