import React, {useContext} from 'react';
import './graphImage.css';
import {LanguageContext} from '../helpers/index.js';
const GraphImage = ({src, src_eng}) => {
  
  const language = useContext(LanguageContext)
  if(language === "eng") {
    src = src_eng
  }
  
  return (
    <>
      <img className="swiper-lazy graph-image" data-src={src} />
  </>
  );
};

export default GraphImage;
