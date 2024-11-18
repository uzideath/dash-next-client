"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "./services/Auth";

export default function HomePage() {
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

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Welcome to Our App</h1>
      {!isAuthenticated && (
        <button
          onClick={handleDiscordLogin}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Log in with Discord
        </button>
      )}
    </div>
  );
}
