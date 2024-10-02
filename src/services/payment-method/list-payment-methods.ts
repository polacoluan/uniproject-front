import api from "../api";

export async function listPaymentMethods() {
    const route = "payment-methods";

    try {
        const response = await api.get(route);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}