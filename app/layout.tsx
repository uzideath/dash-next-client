"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/toggle-theme";
import { ButtonDestructive } from "@/components/logout";
import { AuthService } from "./services/Auth";

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
            <ModeToggle />
            {isAuthenticated && <ButtonDestructive />}
          </div>

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
