import { ORDER_WORK_STATUS } from '@utils/constants';
import { Pencil } from 'lucide-react';
import { dateFormat } from '@utils/helperFunctions';
import { STATUS_ORDER_ICONS } from '@utils/htmlConstants';
import { ExternalLink } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const MultiStepProgress = ({ updates, setItemClick, setOpenPopup }) => {
  const { isAdmin } = useOutletContext();

  return (
    <>
      <ul class="relative flex flex-col md:flex-row gap-2">
        {updates.map((item) => (
          <li class="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
            <div
              class="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
              <span
                class="size-10 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full">
                {STATUS_ORDER_ICONS[item.status]}
              </span>
              <div
                class="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden"></div>
            </div>
            <div class="grow md:grow-0 md:mt-3 pb-5">
              <div className="flex items-center">
                <h3 class="block font-medium mr-1 text-gray-800">{ORDER_WORK_STATUS[item.status]}</h3>
                {isAdmin && <Pencil className="cursor-pointer" color="#1e2939" strokeWidth={2.5} size={14}
                                    onClick={() => {
                                      console.log(item);
                                      setItemClick(item);
                                      setOpenPopup(true);
                                    }} />}
              </div>
              <p class="text-gray-500">{item.description}</p>
              {item.reportFile && (
                <a
                  href={item.reportFile}
                  className=" text-gray-500 hover:underline flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver arquivo
                  <ExternalLink className="ml-1" size={17}></ExternalLink>
                </a>
              )}
              <p class="text-gray-400 text-sm">{dateFormat(new Date(item.postedAt))}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MultiStepProgress;
