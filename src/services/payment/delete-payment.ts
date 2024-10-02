import api from "../api";

export async function deletePayment(id) {
    const route = "payment/"+id;

    try {
        const response = await api.delete(route);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}