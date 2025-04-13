import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const DropDown = ({ listOptions, setChoice, choice, dropBoxPlaceHolder }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (code) => {
    setChoice(code);
    setOpen(false); // fecha o dropdown depois de escolher
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="w-max border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
      >
        {choice
          ? listOptions.find((option) => option.code === choice)?.description || dropBoxPlaceHolder
          : dropBoxPlaceHolder}
        <ChevronDown size={20} className="ml-2" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 ">
          <ul className="py-2 text-sm text-gray-700">
            {listOptions.map((option) => (
              <li key={option.code}> 
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSelect(option.code)}
                >
                  {option.description}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
