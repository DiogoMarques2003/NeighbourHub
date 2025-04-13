import video from '../../../public/videos/honkKKong_apartments.mp4';
import poster from '../../../public/images/firstFrameLoginBackgroundVideo.jpg';

const AuthBackgroundVideo = () => {
  return (
    <>
      <video autoPlay muted loop playsInline className="absolute w-full h-full object-cover opacity-60">
        <source src={video} poster={poster} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-cyan-300 opacity-40" />
    </>
  );
};

export default AuthBackgroundVideo;
