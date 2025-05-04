import { X } from 'lucide-react';

const Popup = ({ openPopUp, closePopUp, popupTitle, children, popupHandleSubmit, className = '', classNamePopUp = '' }) => {
  const handlelosePopUp = (e) => {
    if (e.target.id === 'ModelContainer') {
      closePopUp();
    }
  };

  if (openPopUp !== true) return null;

  return (
    <div
      id="ModelContainer"
      onClick={handlelosePopUp}
      className={`${className} z-10 fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm`}
    >
      <div className={` ${classNamePopUp} p-2 bg-white min-w-11/12 md:min-w-1/3 lg:min-w-1/4 w-auto shadow-inner border border-gray-200 rounded-lg py-5 overflow-visible`}>

        <div className="w-full p-3 justify-center items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex-1" />

            <div className="text-center">
              <h4>{popupTitle}</h4>
            </div>

            <div className="flex-1 text-right">
              <button
                type="button"
                className="text-gray-500 hover:bg-gray-200 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center cursor-pointer  "
                onClick={closePopUp}
              >
                <X></X>
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
          <hr class="h-px mb-4 mt-1 bg-gray-300 border-0"></hr>
          <div className="space-y-4">
            <form onSubmit={popupHandleSubmit} className="space-y-4">
              {children}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
