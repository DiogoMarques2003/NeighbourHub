import { useState } from 'react';
import noImageAvaliable from '../../../../public/images/no_image_avaliable.jpg'
import { getCommonAreaTypeName } from "../../../utils/helperFunctions"
import { Users, Banknote, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommonAreaCard = ({area}) => {
    const [imgSrc, setImgSrc] = useState(area?.images[0] || noImageAvaliable);
    const navigate = useNavigate();

    return (
        <div key={area.id} className="bg-white rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 cursor-pointer"
        onClick={() => navigate(`${area.id}`)}>
            <img 
                src={imgSrc} 
                alt={area.name}
                onError={() => setImgSrc(noImageAvaliable)}
                className="w-full h-64 object-cover bg-gray-50"
            />
            
            <div className="bg-opacity-50 p-3 sm:p-4 flex flex-col justify-between text-gray-600">
                <h2 className="text-sm font-bold">{area.name}</h2>
                {/* <div className="flex justify-between"> */}
                    <p className=" text-sm mt-1">
                        {getCommonAreaTypeName(area.type)} 
                    </p>
                    <div className="flex text-gray-600 text-sm sm:text-md mt-1 items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{area.startSchedule} - {area.endSchedule} </span>
                    </div>
                        
                {/* </div> */}
                
                
                <div className="mt-3 flex justify-between items-center text-gray-600 text-sm sm:text-md font-medium">
                    <div className="flex ">
                        <Users size={16} className="mr-2" />
                        <span>{area.capacity}</span>
                    </div>
                    {area.cost > 0 && (
                         <div className="flex ">
                            <Banknote size={18} className="mr-2" />
                            <span>{area.cost.toFixed(2)}€</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CommonAreaCard;