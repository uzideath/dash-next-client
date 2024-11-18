"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/app/services/Auth";

export function ButtonDestructive() {
    const handleLogout = async () => {
        await AuthService.logOut();
    };

    return (
        <Button variant="destructive" onClick={handleLogout}>
            Logout
        </Button>
    );
}
