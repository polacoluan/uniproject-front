// services/api.ts
import axios from 'axios';
import { Installment } from '../types/installment';

const API_URL = 'http://apiato.test/v1';

// Fetch all installment from the API
export const fetchInstallments = async (): Promise<Installment[]> => {
    const response = await axios.get(`${API_URL}/installment/`);
    return response.data.data;
};

// Fetch a single installment by ID
export const fetchInstallmentById = async (id: number): Promise<Installment> => {
    const response = await axios.get(`${API_URL}/installment/${id}`);
    return response.data.data;
};

// Create a new installment
export const createInstallment = async (installmentData: Installment): Promise<Installment> => {
    const response = await axios.post(`${API_URL}/installment`, installmentData);
    return response.data.data;
};

// Update an existing installment by ID
export const updateInstallment = async (id: number, installmentData: Installment): Promise<Installment> => {
    const response = await axios.patch(`${API_URL}/installment/${id}`, installmentData);
    return response.data.data;
};

// Delete a installment by ID
export const deleteInstallment = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/installment/${id}`);
};