import AuthBackgroundVideo from "../common/AuthBackgroundVideo";

const CentralBoxWithBackGroundVideo = ({ children }) => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <AuthBackgroundVideo/>

            <div className="absolute w-[75%] sm:w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white border-opacity-20">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CentralBoxWithBackGroundVideo;