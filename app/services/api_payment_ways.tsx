// services/api.ts
import axios from 'axios';
import { PaymentWay } from '../types/payment_way';

const API_URL = 'http://apiato.test/v1';

// Fetch all payment from the API
export const fetchPaymentWays = async (): Promise<PaymentWay[]> => {
    const response = await axios.get(`${API_URL}/payment-ways/`);
    return response.data.data;
};

// Fetch a single payment by ID
export const fetchPaymentWayById = async (id: number): Promise<PaymentWay> => {
    const response = await axios.get(`${API_URL}/payment-ways/${id}`);
    return response.data.data;
};

// Create a new payment
export const createPaymentWay = async (paymentWayData: PaymentWay): Promise<PaymentWay> => {
    const response = await axios.post(`${API_URL}/payment-ways`, paymentWayData);
    return response.data.data;
};

// Update an existing payment by ID
export const updatePaymentWay = async (id: number, paymentWayData: PaymentWay): Promise<PaymentWay> => {
    const response = await axios.patch(`${API_URL}/payment-ways/${id}`, paymentWayData);
    return response.data.data;
};

// Delete a payment by ID
export const deletePaymentWay = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/payment-ways/${id}`);
};