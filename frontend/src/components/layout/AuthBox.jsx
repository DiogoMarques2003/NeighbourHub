const AuthBox = ({ children }) => {
    return (
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-8 w-full max-w-md shadow-2xl border border-white border-opacity-20">
        {children}
      </div>
    );
};

export default AuthBox;