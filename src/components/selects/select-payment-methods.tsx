"use client";

import React, { useEffect, useState } from 'react';
import { listPaymentMethods } from '../../services/payment-method/list-payment-methods';

interface DataOption {
  id: number;
  method: string;
  installments: number;
}

interface SelectComponentProps {
  onSelect: (selectedValue: number | '') => void;
  value: number;
}

const SelectPaymentMethods: React.FC<SelectComponentProps> = ({ onSelect, value }) => {
  const [options, setOptions] = useState<DataOption[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      const response = await listPaymentMethods();
      setOptions(response);
    };

    loadOptions();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    onSelect(selectedValue);
  };

  return (
    <div>
      <label htmlFor="select-payment-methods" className="block mb-2">Selecione a forma de pagamento:</label>
      <select
        id="select-payment-methods"
        name="payment_method_id"
        value={value}
        onChange={handleSelectChange}
        className="block w-full px-4 py-2 border rounded"
      >
        <option value="">Selecione</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.method}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPaymentMethods;