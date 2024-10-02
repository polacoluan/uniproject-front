import api from "../api";

export async function listInstallments() {
    const route = "installment";

    try {
        const response = await api.get(route);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}