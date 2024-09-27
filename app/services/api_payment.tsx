// services/api.ts
import axios from 'axios';
import { Payment } from '../types/payment';
import { PaymentTable } from '../types/payment_table';

const API_URL = 'http://apiato.test/v1';

// Fetch all payment from the API
export const fetchPayments = async (): Promise<PaymentTable[]> => {
    const response = await axios.get(`${API_URL}/payment/`);
    return response.data.data;
};

// Fetch a single payment by ID
export const fetchPaymentById = async (id: number): Promise<Payment> => {
    const response = await axios.get(`${API_URL}/payment/${id}`);
    return response.data.data;
};

// Create a new payment
export const createPayment = async (paymentData: Payment): Promise<Payment> => {
    const response = await axios.post(`${API_URL}/payment`, paymentData);
    return response.data.data;
};

// Update an existing payment by ID
export const updatePayment = async (id: number, paymentData: Payment): Promise<Payment> => {
    const response = await axios.patch(`${API_URL}/payment/${id}`, paymentData);
    return response.data.data;
};

// Delete a payment by ID
export const deletePayment = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/payment/${id}`);
};