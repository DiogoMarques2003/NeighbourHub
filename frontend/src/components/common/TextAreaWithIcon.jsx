import React from 'react';

const TextAreaWithIcon = ({ 
  icon: Icon, 
  type, 
  name, 
  placeholder, 
  value, 
  onChange,
  required = false,
  maxLength,
  rows = 4
}) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-3 text-gray-500 pointer-events-none" size={20} />
      <textarea
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 border-opacity-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all bg-white bg-opacity-30 text-gray-800 placeholder-gray-500"
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        rows={rows}
      />
    </div>
  );
};

export default TextAreaWithIcon;