const ErrorBar = ({error}) => {
    return(
        <div>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
        </div>
    )
}

export default ErrorBar;