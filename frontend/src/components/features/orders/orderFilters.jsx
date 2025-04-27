import { ChevronsDown, ChevronsUp, Star } from 'lucide-react';
import { useState } from 'react';
import ErrorBar from '@common/ErrorBar';

const OrderFilters = ({ statusOpt, urgeOpt, status, urgency, filterError }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="my-8 bg-white px-6 py-2 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-700">Filtros</h2>
        <button
          className="text-blue-500 flex items-center cursor-pointer"
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? <ChevronsUp /> : <ChevronsDown />}
        </button>
        <ErrorBar className="" error={filterError} />
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-8 items-end transition-all duration-300 ease-in-out mt-3">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <DropDown
              listOptions={statusOpt}
              setChoice={status}
              choice={status}
              dropBoxPlaceHolder="Status"
              icon={Tags}
            />

            <DropDown
              listOptions={urgeOpt}
              setChoice={urgency}
              choice={urgency}
              dropBoxPlaceHolder="Urgência"
              icon={AlarmClock}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;
