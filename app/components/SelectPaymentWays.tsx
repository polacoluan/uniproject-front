// app/components/SelectPaymentWays.tsx
"use client"; // Ensure this is present

import React, { useEffect, useState } from 'react';
import { fetchPaymentWays } from '../services/api_payment_ways';

interface DataOption {
  id: number;
  way: string;
  installments: number;
}

const SelectPaymentWays: React.FC = () => {
  const [options, setOptions] = useState<DataOption[]>([]); // Store the options
  const [selectedOption, setSelectedOption] = useState<number | ''>(''); // Store the selected value

  // Fetch options from the API when the component mounts
  useEffect(() => {
    const loadOptions = async () => {
      const data = await fetchPaymentWays(); // API call to fetch data
      setOptions(data); // Set options to state
    };

    loadOptions();
  }, []);

  // Handle change in select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(e.target.value)); // Update selected option
  };

  return (
    <div>
      <label htmlFor="select-students" className="block mb-2">Selecione a forma de pagamento:</label>
      <select
        id="select-students"
        name="payment_way_id"
        value={selectedOption}
        onChange={handleSelectChange}
        className="block w-full px-4 py-2 border rounded"
      >
        <option value="">--Selecione--</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.way} {/* Display the name or other appropriate field */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPaymentWays;
