import { ChevronsDown, ChevronsUp, Star } from 'lucide-react';
import InputWithIcon from '@common/InputWithIcon';
import CheckBox from '@common/CheckBox';
import { useState } from 'react';
import ErrorBar from '@common/ErrorBar';

const ListServiceFiltersCard = ({
  minReviews,
  setMinReviews,
  maxReviews,
  setMaxReviews,
  myServices,
  setMyServices,
  filterError,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="my-8 bg-white px-6 py-2 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Filtros</h2>
        <button
          className="text-blue-500 flex items-center cursor-pointer"
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? <ChevronsUp /> : <ChevronsDown />}
        </button>
        <ErrorBar error={filterError} />
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-8 items-end transition-all duration-300 ease-in-out">
          <div className="flex flex-col min-w-[120px]">
            <label className="text-xs text-gray-500 mb-1">Nota mínima</label>
            <InputWithIcon
              icon={Star}
              min={0}
              max={5}
              type="number"
              value={minReviews}
              onChange={(e) => setMinReviews(Number(e.target.value))}
              placeholder="Avaliação mínima"
            />
          </div>

          <div className="flex flex-col min-w-[120px]">
            <label className="text-xs text-gray-500 mb-1">Nota máxima</label>
            <InputWithIcon
              icon={Star}
              min={minReviews}
              max={5}
              type="number"
              value={maxReviews}
              onChange={(e) => setMaxReviews(Number(e.target.value))}
              placeholder="Avaliação máxima"
            />
          </div>

          <div className="flex items-center gap-2">
            <CheckBox description="Ver apenas os meus serviços" checkBox={myServices} handleCheckbox={setMyServices} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListServiceFiltersCard;
