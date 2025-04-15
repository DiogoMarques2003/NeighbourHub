import noImageAvaliable from "../../../public/images/no_image_avaliable.jpg"

const CommonAreasLayout = ({ commonAreas }) => {
    const getTypeName = (type) => {
        const types = {
          1: 'Lazer',
          2: 'Fitness',
        };
        return types[type] || 'Outros';
      };
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {commonAreas.map((area) => (
            <div key={area.id} className="bg-white rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105">
                <div className="relative h-100">
                    <img 
                        src={noImageAvaliable || area.images[0]  } 
                        alt={area.name} 
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-400 bg-opacity-50 text-white p-4">
                        <h2 className="text-xl font-bold">{area.name}</h2>
                    </div>
                </div>

                <div className="p-4">
                    <p className="text-gray-700 font-medium">{getTypeName(area.type)}</p>
                    <p className="text-gray-600 text-sm mt-1">
                        Capacidade: {area.capacity} pessoas
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm font-medium">
                        {area.startSchedule} - {area.endSchedule}
                        </span>
                        {area.cost > 0 && (
                        <span className="text-blue-600 font-bold">{area.cost.toFixed(2)} €/hr</span>
                        )}
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
    
}

export default CommonAreasLayout;