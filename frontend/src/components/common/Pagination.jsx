import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Pagination = ({ currentPage, maxPage, setCurrentPage, className }) => {
  return (
    <>
      <div class={`flex items-center gap-8 ${className}`}>
        <button
          disabled={currentPage === 1}
          class="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => setCurrentPage((page) => page - 1)}
        >
          <ArrowLeft size={20} />
        </button>

        <p class="text-slate-600">
          Página <strong class="text-slate-800">{currentPage}</strong> de&nbsp;
          <strong class="text-slate-800">{maxPage}</strong>
        </p>

        <button
          disabled={currentPage === maxPage}
          class="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </>
  );
};

export default Pagination;
