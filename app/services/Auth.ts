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
        window.location.href = "http://localhost:3001/api/v1/auth/login";
    },
};