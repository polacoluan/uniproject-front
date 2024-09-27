// services/api.ts
import axios from 'axios';
import { PaymentMethod } from '../types/payment_method';

const API_URL = 'http://apiato.test/v1';

// Fetch all payment from the API
export const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
    const response = await axios.get(`${API_URL}/payment-methods/`);
    return response.data.data;
};

// Fetch a single payment by ID
export const fetchPaymentMethodById = async (id: number): Promise<PaymentMethod> => {
    const response = await axios.get(`${API_URL}/payment-methods/${id}`);
    return response.data.data;
};

// Create a new payment
export const createPaymentMethod = async (paymentMethodData: PaymentMethod): Promise<PaymentMethod> => {
    const response = await axios.post(`${API_URL}/payment-methods`, paymentMethodData);
    return response.data.data;
};

// Update an existing payment by ID
export const updatePaymentMethod = async (id: number, paymentMethodData: PaymentMethod): Promise<PaymentMethod> => {
    const response = await axios.patch(`${API_URL}/payment-methods/${id}`, paymentMethodData);
    return response.data.data;
};

// Delete a payment by ID
export const deletePaymentMethod = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/payment-methods/${id}`);
};