import { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';

const EditPhoto = ({ onImageChange, type = 'circular', previewUrlImage, showRemove = false }) => {
  const [_, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(previewUrlImage);
  const fileInputRef = useRef(null);

  const variantTypes = {
    circular: 'w-24 h-24 rounded-full',
    circular_large: 'w-38 h-38 rounded-full',
    square_normal: 'w-full h-55 rounded-lg',
    square_large: 'w-full h-120 rounded-lg',
  };

  const buttonPositionClass = {
    circular: 'top-0 right-0',
    circular_large: 'top-2 right-2',
    square_normal: 'top-2 right-2',
    square_large: 'top-2 right-2',
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setPreviewUrl(null);
    fileInputRef.current.value = null;

    if (onImageChange) {
      onImageChange(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 relative">
      <div className="relative group">
        <div
          onClick={handleImageClick}
          className={`${variantTypes[type]} bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden`}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
          ) : (
            <Camera size={32} className="text-gray-500" />
          )}
        </div>

        {showRemove && previewUrl && (
          <button
            type="button"
            onClick={() => handleRemoveImage()}
            className={`absolute ${buttonPositionClass[type]} bg-white p-1 rounded-full shadow-md text-red-500 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer`}
          >
            <X size={14} />
          </button>
        )}
      </div>

      <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
    </div>
  );
};

export default EditPhoto;
