import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

const PhotoContainer = ({ type="circular", previewUrlImage }) => {

    const variantTypes= {
      circular: "w-24 h-24 rounded-full",
      square_normal: "w-full h-55 rounded-lg",
      square_large: "w-full h-120 rounded-lg"
    }

    return (
        <div className="flex justify-center">
          <div
            className={`${variantTypes[type]} bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden`}
          >
              <img 
                src={previewUrlImage} 
                alt="Profile preview" 
                className="w-full h-full object-cover"
                
              />
          </div>
        </div>
    )
}

export default PhotoContainer;