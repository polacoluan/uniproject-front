import api from "../api";

export async function createPayment(params) {
    const route = "payment/";

    try {
        const response = await api.post(route, params);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}