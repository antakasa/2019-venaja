import React from 'react';
import {BackgroundStill, BackgroundVideo} from '../components/index.js';
const determineBackgroundType = (element, desktop, triggerCoverLoaded) => {
  const {type, src, sub, tg, desktopSrc,src_desktop, id, text_location} = element;
  if (type === 'still') {
    return <BackgroundStill coverLoadedCallback={false} src={src} />;
  } else if (type === 'cover') {
    return (
      <BackgroundStill
        coverLoadedCallback={triggerCoverLoaded}
        desktopSrc={desktop ? desktopSrc : null}
        cover
        src={src}
      />
    );
  } else if (type === 'background-video') {
    return <BackgroundVideo src_desktop={src_desktop} src={src} text_location={text-location} />;
  } else if (type === 'subtitled-video') {
    return (
     <BackgroundVideo src_desktop={src_desktop} src={src} id={id} sub={sub} tg={tg} desktop={desktop} />
    );
  } else {
    return null;
  }
};

export default determineBackgroundType;
