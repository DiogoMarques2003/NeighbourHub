import { Loader2 } from "lucide-react";

const Button = ({ 
  type = "button", 
  children, 
  onClick, 
  isLoading = false, 
  disabled = false,
  className = "",
  fullWidth = false,
  variant = "primary"
}) => {
  const baseClasses = "py-3 px-4 font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 transition-all transform cursor-pointer";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:-translate-y-1 focus:ring-blue-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-md hover:-translate-y-1 focus:ring-gray-300",
    outline: "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50 hover:shadow-md hover:-translate-y-1 focus:ring-blue-200"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  const disabledClasses = (isLoading || disabled) ? "opacity-70 cursor-not-allowed" : "";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClasses} ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin mr-2" size={20} />
          <span>Em processamento...</span>
        </div>
      ) : children}
    </button>
  );
};

export default Button;