import api from "../api";

export async function listStudents() {
    const route = "student";

    try {
        const response = await api.get(route);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}