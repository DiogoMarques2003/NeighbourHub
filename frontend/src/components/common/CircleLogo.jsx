const CircleLogo = ({ src, alt, size = "md" }) => {
  const sizeClasses = {
    em: "w-15 h-15",
    sm: "w-20 h-20",
    md: "w-30 h-30",
    lg: "w-50 h-50"
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
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