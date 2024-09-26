// services/api.ts
import axios from 'axios';
import { Student } from '../types/student';

const API_URL = 'http://apiato.test/v1';

// Fetch all students from the API
export const fetchStudents = async (): Promise<Student[]> => {
    const response = await axios.get(`${API_URL}/student/`);
    return response.data.data;
};

// Fetch a single student by ID
export const fetchStudentById = async (id: number): Promise<Student> => {
    const response = await axios.get(`${API_URL}/student/${id}`);
    return response.data.data;
};

// Create a new student
export const createStudent = async (studentData: Student): Promise<Student> => {
    const response = await axios.post(`${API_URL}/student`, studentData);
    return response.data.data;
};

// Update an existing student by ID
export const updateStudent = async (id: number, studentData: Student): Promise<Student> => {
    const response = await axios.patch(`${API_URL}/student/${id}`, studentData);
    return response.data.data;
};

// Delete a student by ID
export const deleteStudent = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/student/${id}`);
};