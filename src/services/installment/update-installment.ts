import api from "../api";

export async function updateInstallment(id, params) {
    const route = "installment/"+id;

    try {
        const response = await api.patch(route, params);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}