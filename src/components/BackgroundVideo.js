import React, {useRef, useState, useEffect, useContext} from 'react';
import {ProgressBar} from '../components/pagination';
import {createSubtitleTrack, secondsToTime, LanguageContext} from '../helpers/index.js';
const BackgroundVideo = ({src, src_desktop, sub, sub_eng, tg, tg_eng, desktop, id}) => {
  const trackEl = useRef(null);
  const videoEl = useRef(null);
  const language = useContext(LanguageContext)
  if(language === "eng") {
  console.log(sub_eng)
    sub = sub_eng
    tg = tg_eng
  }
  const [progress, updateProgress] = useState(0);
  const [time, updateTime] = useState({h: 0, m: 0, s: 0});
  const [currentSub, displaySub] = useState('');
  useEffect(() => {
    const track = createSubtitleTrack(videoEl, id, sub);
    if (!track) return;
    track.oncuechange = function(event) {
      const activeCues = track.activeCues;
      if (activeCues.length > 0) displaySub(activeCues[0].text);
      if (activeCues.length === 0) displaySub('');
    };
  }, []);

  return (
   <>
   <div className="swiper-video">
      <video
        className="swiper-video-player anchor-middle-center"
        preload="metadata"
        crossOrigin="anonymous"
        playsInline
        ref={videoEl}
        onTimeUpdate={e => {
          const {duration, currentTime} = videoEl.current;
          updateProgress((currentTime / duration) * 100);
          updateTime(secondsToTime(duration - currentTime || 0));
        }}
        muted
        loop
        data-src={desktop? src_desktop : src}>
        <source data-src={desktop? src_desktop : src} type="video/mp4" />
        {sub && false && (
          <track
            label="Finnish"
            kind="subtitles"
            ref={trackEl}
            crossOrigin="anonymous"
            srcLang="fi"
            data-src={sub}
            default
          />
        )}
      </video>
    </div>
      {sub && (
        <div className="swiper-position-center">
        <div
          className={`venezuela-subtitle-container ${
            desktop ? 'desktop' : ''
          }`}>
          {tg && desktop && (
            <img
              src={tg}
              className={`subvideo-tg ${desktop ? 'desktop' : ''}`}
            />
          )}
          <div
            style={{
              display: currentSub.length === 0 ? 'none' : 'initial',
            }}
            className={`venezuela-subtitle ${desktop ? 'desktop' : ''}`}>
            {currentSub.length > 0 && <q>{currentSub}</q>}
          </div>

          <div className="tg-and-progress">
            {tg && !desktop && (
              <img
                src={tg}
                className={`subvideo-tg ${desktop ? 'desktop' : ''}`}
              />
            )}
            <div className="time-left">
              {time.m}:{time.s}
            </div>
            <div className={`video-progress ${tg && !desktop ? 'half' : ''}`}>
              <ProgressBar percentage={progress} />
            </div>
          </div>
        </div>
        </div>
      )}
      </>
  );
};

export default BackgroundVideo;
