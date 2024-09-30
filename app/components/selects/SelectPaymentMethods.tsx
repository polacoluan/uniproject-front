// app/components/SelectPaymentMethods.tsx
"use client"; // Ensure this is present

import React, { useEffect, useState } from 'react';
import { fetchPaymentMethods } from '../../services/api_payment_methods';

interface DataOption {
  id: number;
  method: string;
  installments: number;
}

interface SelectComponentProps {
  onSelect: (selectedValue: number | '') => void; // Prop to pass selected value back
  value: number; // Controlled by the parent component
}

const SelectPaymentMethods: React.FC<SelectComponentProps> = ({ onSelect, value }) => {
  const [options, setOptions] = useState<DataOption[]>([]); // Store the options

  // Fetch options from the API when the component mounts
  useEffect(() => {
    const loadOptions = async () => {
      const data = await fetchPaymentMethods(); // API call to fetch data
      setOptions(data); // Set options to state
    };

    loadOptions();
  }, []);

  // Handle change in select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    onSelect(selectedValue); // Pass the selected value to the parent component
  };

  return (
    <div>
      <label htmlFor="select-payment-methods" className="block mb-2">Selecione a forma de pagamento:</label>
      <select
        id="select-payment-methods"
        name="payment_method_id"
        value={value} // Controlled value from the parent component
        onChange={handleSelectChange}
        className="block w-full px-4 py-2 border rounded"
      >
        <option value="">--Selecione--</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.method} {/* Display the name or other appropriate field */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPaymentMethods;