import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';

export const AuthService = {
    async checkAuthStatus(): Promise<boolean> {
        try {
            const response = await axios.get(`${BASE_URL}/auth/status`, {
                withCredentials: true,
            });
            return response.data?.authenticated === true;
        } catch (error) {
            console.error('Error verifying authentication status:', error);
            return false;
        }
    },

    loginWithDiscord() {
        window.location.href = `${BASE_URL}/auth/login`;
    },

    async logOut() {
        try {
            await axios.post(
                `${BASE_URL}/auth/logout`,
                {},
                { withCredentials: true }
            );

            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    },
};
