"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/toggle-theme";
import { AuthService } from "./services/Auth";
import { UserSection } from "@/components/user-section";
import PremiumButton from "@/components/premium-button";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authenticated = await AuthService.checkAuthStatus();
      setIsAuthenticated(authenticated);
    };

    fetchAuthStatus();
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
            <PremiumButton />
            <ModeToggle />
            {isAuthenticated && <UserSection />}
          </div>

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
