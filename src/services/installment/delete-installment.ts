import api from "../api";

export async function deleteInstallment(id) {
    const route = "installment/"+id;

    try {
        const response = await api.delete(route);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}