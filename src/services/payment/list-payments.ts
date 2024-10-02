import api from "../api";

export async function listPayments() {
    const route = "payment";

    try {
        const response = await api.get(route);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}