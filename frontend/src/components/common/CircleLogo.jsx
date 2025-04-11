const CircleLogo = ({ src, alt, size = "lg" }) => {
    const sizeClasses = {
      sm: "w-20 h-20",
      md: "w-32 h-32",
      lg: "w-50 h-50"
    };
    
    return (
      <div className="flex justify-center">
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-white border-opacity-30`}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
};

export default CircleLogo;