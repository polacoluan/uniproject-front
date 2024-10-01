"use client";

import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import api from '../../services/api';
import { Payment } from '../../types/payment';
import SelectStudents from "../selects/select-students"
import SelectPaymentMethods from "../selects/select-payment-methods"

interface PaymentFormProps {
    payment?: Payment;
    onSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ payment, onSuccess }) => {

    const [formData, setFormData] = useState<Payment>({
        id: 0,
        student_id: 0,
        amount: 0,
        payment_method_id: 0
    });

    useEffect(() => {
        if (payment) {
            setFormData(payment);
        } else {
            setFormData({
                id: 0,
                student_id: 0,
                amount: 0,
                payment_method_id: 0
            });
        }
    }, [payment]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (payment) {
                await api.patch('/payment/'+payment.id, formData);
            } else {
                await api.post('/payment/', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Falha ao enviar o formulário:', error);
        }
    };

    const handleSelectPaymentMethod = (selectedValue: number | '') => {
        setFormData((prevData) => ({
            ...prevData,
            payment_method_id: selectedValue as number,
        }));
    };

    const handleSelectStudent = (selectedValue: number | '') => {
        setFormData((prevData) => ({
            ...prevData,
            student_id: selectedValue as number,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <SelectStudents value={formData.student_id} onSelect={handleSelectStudent} />

            <SelectPaymentMethods value={formData.payment_method_id} onSelect={handleSelectPaymentMethod} />

            <label htmlFor="amount" className="block mb-2">Valor à pagar:</label>
            <InputMask
                id="amount"
                mask="9999.99"
                type="text"
                name="amount"
                placeholder="Valor"
                value={formData.amount || ''}
                onChange={handleChange}
                className="block w-full px-4 py-2 border rounded"
                required
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                <i className="fa-solid fa-floppy-disk"></i> Salvar
            </button>
        </form>
    );
};

export default PaymentForm;
