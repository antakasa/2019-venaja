import React from 'react';
import {useWindowSize, playAndPause} from '../helpers/index.js';
import {Arrows} from './index.js';
import {
  determineBackgroundType,
  determineContentType,
} from '../helpers/index.js';
const SlideContainer = ({
  e,
  triggerCoverLoaded,
  goPrev,
  index,
  goNext,
  swiper,
  prevClickAvailable,
  nextClickAvailable,
}) => {
  const [width, height] = useWindowSize();
  const isDesktop = width >= 1025;

  return (
    <div style={{height: '100%'}}>
      {prevClickAvailable && <div onClick={goPrev} className="prev-catch" id={`prev-${index}`} />}
      {nextClickAvailable && <div onClick={goNext} className="next-catch" id={`next-${index}`} />}
      {determineBackgroundType(e, isDesktop, triggerCoverLoaded)}
      {determineContentType(index, e, isDesktop, swiper)}
      <Arrows type={e.type} desktop={isDesktop} index={index} />
    </div>
  );
};

export default SlideContainer;
