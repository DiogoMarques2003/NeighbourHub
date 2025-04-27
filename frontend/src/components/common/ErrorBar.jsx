const ErrorBar = ({ error, className = 'mb-4' }) => {
  return <>{error && <div className={`${className} p-3 bg-red-100 text-red-700 rounded-lg`}>{error}</div>}</>;
};

export default ErrorBar;
