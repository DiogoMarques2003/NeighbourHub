import { useRef } from 'react';
import { toast } from 'react-toastify';
import { FileUp, X } from 'lucide-react';

const UploadFile = ({ description, title, filesAcceptance, setFile, file }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const fileSelected = e.target.files[0];
    if (fileSelected) {
      if (!fileSelected.name.endsWith('.pdf')) return toast.error('Ficheiro tem de ser um pdf');
      setFile(fileSelected);
    }
  };

  return (
    <>
      {!file ? (
        <div className="rounded-md w-full max-w-md">
          <label
            onClick={handleClick}
            className=" py-3 px-4 cursor-pointer shadow-md bg-gradient-to-r font-medium from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:-translate-y-1 focus:ring-blue-300 px-4 py-2 rounded-md block text-center transition"
          >
            {title}
          </label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept={filesAcceptance}
          />
          <p className="text-sm text-gray-400 mt-2">{description}</p>
        </div>
      ) : (
        <div className="w-full rounded-md bg-gray-100 p-3 flex items-center">
          <FileUp size={32} color="#858585" className="mr-2" />
          <span className="text-gray-600 font-medium">{file?.name}</span>
          <div className="flex-1 text-right">
            <button
              type="button"
              className="text-gray-500 hover:bg-gray-200 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center cursor-pointer  "
              onClick={() => {setFile(null)}}
            >
              <X></X>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadFile;
