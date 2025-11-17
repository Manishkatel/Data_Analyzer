import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import introVideo from '../assets/videos/intro_3.mp4';

interface VideoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VideoLogo: React.FC<VideoLogoProps> = ({ 
  size = 'md', 
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const hasPlayedRef = useRef(false);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => {
      if (video.paused && !hasPlayedRef.current) {
        video.play()
          .then(() => {
            hasPlayedRef.current = true;
          })
          .catch(() => {
            console.log('Autoplay prevented, will play on user click');
          });
      }
    };

    // Try to play immediately after mount
    tryPlay();
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-xl"></div>
      <div
        className={`${sizeClasses[size]} relative z-10 overflow-hidden cursor-pointer`}
        onClick={() => {
          const video = videoRef.current;
          if (video && video.paused) {
            video.play().catch(err => console.error('Click play error:', err));
          }
        }}
        onContextMenu={e => {
          e.preventDefault();
          navigate('/');
        }}
      >
        <video
          ref={videoRef}
          src={introVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: 'scale(0.9)',
            transformOrigin: 'center center',
            zIndex: 1,
            maskImage:
              'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage:
              'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 85%)',
          }}
          onEnded={() => {
            const video = videoRef.current;
            if (video) {
              // pause and prevent replay
              video.pause();
            }
          }}
        />
      </div>
    </div>
  );
};

export default VideoLogo;
