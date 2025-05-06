import { useRef } from 'react';

const UploadFile = ({description, filesAcceptance, setFile, file}) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="rounded-md w-full max-w-md">
        <label
          onClick={handleClick}
          className="cursor-pointer bg-gradient-to-r font-medium from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:-translate-y-1 focus:ring-blue-300 px-4 py-2 rounded-md block text-center transition"
        >
          Upload file
        </label>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={filesAcceptance}
        />
        <p className="text-sm text-gray-400 mt-2">
          {description}
        </p>
      </div>
    </>
  );
};

export default UploadFile;