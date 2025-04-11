import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

const UploadPhoto = ({ onImageChange }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };
      
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setProfileImage(file);
          // Create preview URL
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result);
          };
          reader.readAsDataURL(file);
        }

        if (onImageChange) {
            onImageChange(file);
        }
    };

    return (
        <div className="flex justify-center mb-6">
          <div 
            onClick={handleImageClick}
            className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Profile preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera size={32} className="text-gray-500" />
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
    )
}

export default UploadPhoto;