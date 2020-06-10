import React, {useState, useEffect, useContext} from 'react';
import {playAndPause} from '../helpers/index.js';
import {Slide, LoadingOverlay} from './index.js';
import {AnalyticsMethods as Analytics, lazyHelpers} from '../helpers/index.js';
import Swiper from 'react-id-swiper';
import GridContext from "../helpers/gridContext";
import ContextDevTool from 'react-context-devtool';
console.log(GridContext)
const SetupSwiper = ({data, index, updateCurrentIndex, storeNextSlideFunc}) => {
  const [swiper, updateSwiper] = useState(null);
  const [initialized, initDone] = useState(false);
  const [coverImageLoaded, triggerCoverLoaded] = useState(false);
  const {updateData} = useContext(GridContext)
  const [gridValues,updateGridvalue ] = useState({})
  
  
  const params = {
    getSwiper: updateSwiper,
    init: false,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    },
    preloadImages: false,
    effect: 'none',
    mousewheel: {sensitivity: 0.2},
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    speed: 0,
    noSwiping: true,
    on: {
      slideChangeTransitionEnd: () => {
        playAndPause();
      },
    },
  };

  useEffect(() => {
    if (swiper !== null) {
      //window.swiper = swiper;
      swiper.on('init', () => {
        lazyHelpers.initialize();
        lazyHelpers.loadNextPic();
        lazyHelpers.loadNextPic();
        lazyHelpers.loadNextPic();
        lazyHelpers.loadNextVideo(); // eka video
        initDone(true);
        Analytics.registerEvent(`cover`);
        storeNextSlideFunc(() => () => goNext());
        document.body.onkeydown = function(e) {
          if(e.keyCode == 38) { // top
            swiper.slidePrev();
          }
          else if(e.keyCode == 40) { // bottom
            swiper.slideNext();
          }

          const keycodes = [49,50,51,52,53,54,55,56,57]
            if(keycodes.indexOf(e.keyCode) > -1) { 
                updateGridvalue((prevState) => ({...prevState, [swiper.realIndex]: keycodes.indexOf(e.keyCode)}))
            }
        }
      });
      swiper.init();
      swiper.on('slideChange', () => {
        lazyHelpers.loadNextVideo(); // eka video
        lazyHelpers.loadNextPic();
        updateCurrentIndex(swiper.realIndex);
        Analytics.registerEvent(`slide${swiper.realIndex}`);
      });
    }
  }, [swiper]);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };


  return (
    <>
      <LoadingOverlay isVisible={coverImageLoaded && initialized} />
      <GridContext.Provider value={{gridValues}}>
      <ContextDevTool context={GridContext} id="uniqContextId" displayName="Context Display Name" />
      <Swiper {...params}>
        {data.map((e, i) => (
          <div key={i}>
            <Slide
              e={e}
              prevClickAvailable={initialized && index !== 0}
              nextClickAvailable={initialized && index !== data.length - 1}
              goNext={goNext}
              index={index}
              goPrev={goPrev}
              triggerCoverLoaded={triggerCoverLoaded}
              swiper={swiper}
            />
          </div>
        ))}
      </Swiper>
      </GridContext.Provider>
    </>
  );
};

export default SetupSwiper;