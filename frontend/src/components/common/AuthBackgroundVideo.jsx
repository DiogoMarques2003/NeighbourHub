const AuthBackgroundVideo = () => {
    return (
      <video 
        autoPlay 
        muted 
        loop
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="../../../../public/videos/honkKKong_apartments.mp4" poster="../../../../public/images/firstFrameLoginBackgroundVideo.jpg" type="video/mp4" />
      </video>
    );
};

export default AuthBackgroundVideo;
  