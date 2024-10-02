import api from "../api";

export async function createStudent(params) {
    const route = "student/";

    try {
        const response = await api.post(route, params);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}