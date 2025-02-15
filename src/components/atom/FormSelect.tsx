import React, { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  defaultOption?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({ 
  options, 
  defaultOption = 'Choose an option', 
  className = '', 
  ...props 
}) => {
  return (
    <select
      {...props}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
        ${className}`}
    >
      <option value="">{defaultOption}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
