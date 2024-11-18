import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";
import {
    User,
    CreditCard,
    Settings,
    LogOut,
} from "lucide-react";
import { AuthService } from "@/app/services/Auth";

// Simulated user data
const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://github.com/shadcn.png",
};
export function UserSection() {
    const handleLogOut = () => {
        AuthService.logOut();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{userData.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuItem onClick={handleLogOut}>
                    <LogOut />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}