const Button = ({ children, onClick, type = "button", className = "" }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${className}`}
      >
        {children}
      </button>
    );
  };

export default Button