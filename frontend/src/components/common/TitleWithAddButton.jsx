import { Plus } from 'lucide-react';

const TitleWithAddButton = ({title, onAddClick, addText}) => {
    return (
        <div className="flex justify-between p-4">
            <h2 className='text-blue-500 text-xl font-semibold'>{title}</h2>
            <div className="flex items-center">
                {onAddClick && (
                    <button className="text-blue-500 flex items-center cursor-pointer" onClick={onAddClick}>
                        <Plus size={30} />
                        <span className="ml-1">{addText ? addText : ''}</span>
                    </button>
                )}
            </div>
        </div>
    )
};

export default TitleWithAddButton;