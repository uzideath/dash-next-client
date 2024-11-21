import axios from "@/app/core/axios";

export const AuthService = {
    async checkAuthStatus(): Promise<boolean> {
        try {
            const response = await axios.get(`/auth/status`, {
                withCredentials: true,
            });
            return response.data?.authenticated === true;
        } catch (error) {
            return false;
        }
    },

    loginWithDiscord() {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
    },

    async logOut() {
        try {
            await axios.post(
                `/auth/logout`,
                {},
                { withCredentials: true }
            );

            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    },
};
