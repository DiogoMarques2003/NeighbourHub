import noImageAvaliable from '../../../../public/images/no_image_avaliable.jpg'
import { getTypeName } from "../../../utils/helperFunctions"

const CommonAreaCard = ({area}) => {
    return (
        <div key={area.id} className="bg-white rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105">
            <img 
                src={area?.images[0] || noImageAvaliable} 
                alt={area.name} 
                className="w-full h-64 object-contain bg-gray-50"
            />
            
            <div className="bg-opacity-50 p-4">
                <h2 className="text-sm font-bold">{area.name}</h2>
                <p className="text-gray-600 text-sm mt-1">
                    {getTypeName(area.type)} • {area.startSchedule}h até às {area.endSchedule}h
                </p>
                <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm font-medium">
                        Capacidade: {area.capacity} pessoas
                    </span>
                    {area.cost > 0 && (
                    <   span className="font-bold">€ {area.cost.toFixed(2)} hora</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CommonAreaCard;