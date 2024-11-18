"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "../services/Auth";


export function useAuthHandler() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            const authStatus = await AuthService.checkAuthStatus();
            setIsAuthenticated(authStatus);
            setLoading(false);
            if (authStatus) {
                router.push("/dashboard");
            }
        };

        checkAuthentication();
    }, [router]);

    const handleDiscordLogin = () => {
        AuthService.loginWithDiscord();
    };

    return {
        isAuthenticated,
        loading,
        handleDiscordLogin,
    };
}
