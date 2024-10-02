import api from "../api";

export async function deleteStudent(id) {
    const route = "student/"+id;

    try {
        const response = await api.delete(route);

        return response.data.data;
    } catch (error) {
        
        console.error(error);
    }
}