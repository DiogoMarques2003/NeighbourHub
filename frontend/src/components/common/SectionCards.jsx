import React from 'react';

const SectionCards = ({ title, items, isLoading, renderItem, onViewAll }) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
          <span className="inline-block px-2 py-1 bg-[#e6f4fa] text-[#3e94bf] rounded-md">
            {title}
          </span>
        </h2>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-[#3e94bf] hover:text-[#31789c] transition-colors duration-200 hover:underline"
        >
          Ver Todos →
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {isLoading ? <p>A carregar...</p> : items.map(renderItem)}
      </div>
    </section>
  );
};

export default SectionCards;
