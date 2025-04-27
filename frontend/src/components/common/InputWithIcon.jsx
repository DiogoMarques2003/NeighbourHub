import React from 'react';

const InputWithIcon = ({ 
  icon: Icon, 
  type, 
  name, 
  placeholder, 
  value, 
  onChange,
  required = false,
  maxLength,
  min = null,
  max = null,
  className,
}) => {
  return (
    <div className={`relative ${className}`}>
      {Icon && ( <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} /> )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-lg border border-gray-200 border-opacity-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all bg-white bg-opacity-30 text-gray-800 placeholder-gray-500`}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        min={min}
        max={max}
      />
    </div>
  );
};

export default InputWithIcon;