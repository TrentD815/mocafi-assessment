import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const checkBalance = async (cardNumber: string, pin: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/balance/${cardNumber}?pin=${pin}`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Failed to fetch balance')
        }
        throw error
    }
}