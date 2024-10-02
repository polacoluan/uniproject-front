import api from "../api";

export async function updatePayment(id, params) {
    const route = "payment/"+id;

    try {
        const response = await api.patch(route, params);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}