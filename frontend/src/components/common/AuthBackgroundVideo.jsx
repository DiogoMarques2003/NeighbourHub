import video from "../../../public/videos/honkKKong_apartments.mp4"
import poster from "../../../public/images/firstFrameLoginBackgroundVideo.jpg"

const AuthBackgroundVideo = () => {
    return (
      <video 
        autoPlay 
        muted 
        loop
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src={video} poster={poster} type="video/mp4" />
      </video>
    );
};

export default AuthBackgroundVideo;
  