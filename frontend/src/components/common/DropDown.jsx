import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const DropDown = ({ listOptions, setChoice, choice, dropBoxPlaceHolder, icon: Icon }) => {
  const [open, setOpen] = useState(false);
  let dropdownOptions = listOptions;
  const dropdownRef = useRef(null);

  const handleSelect = (code) => {
    setChoice(code);
    setOpen(false); // fecha o dropdown depois de escolher
  };

  if (listOptions && typeof listOptions === 'object' && !Array.isArray(listOptions)) {
    dropdownOptions = Object.entries(listOptions).map(([key, value]) => ({
      code: key,
      description: value,
    }));
  }

  // fecha o dropdown ao clique exterior
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 border-opacity-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all bg-white bg-opacity-30 text-gray-800 placeholder-gray-500 text-left"
      >

        {choice
          ? dropdownOptions.find((option) => option.code == choice)?.description || dropBoxPlaceHolder
          : dropBoxPlaceHolder
        }

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown size={20} className="ml-2" />
        </div>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-full max-h-60 overflow-auto">
          <ul className="py-2 text-sm text-gray-700">
            {dropdownOptions.map((option) => (
              <li key={option.code}> 
                <button
                  className="text-left w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
