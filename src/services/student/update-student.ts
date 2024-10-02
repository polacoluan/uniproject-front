import api from "../api";

export async function updateStudent(id, params) {
    const route = "student/"+id;

    try {
        const response = await api.patch(route, params);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}