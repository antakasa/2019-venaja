import {
  ParagraphCover,
  FinalPage,
  GraphImage,
  ParagraphChapter,
} from '../components/index.js';
import React from 'react';
const determineContentType = (index, e, desktop, swiper) => {
  const {
    src,
    credits,
    text,
    time,
    type,
    bottom,
    areenaVideo,
    header1,
    subheader,
    id,
    header1_eng,
    subheader_eng,
    src_eng,
    credits_eng,
    text_eng
  } = e;
  if (type === 'graph') {
    return <GraphImage src={src} src_eng={src_eng} />;
  } else if (type === 'finalPage') {
    return <FinalPage swiper={swiper} index={index} areenaId={areenaVideo} />;
  } else if (type === 'cover') {
    return (
      <ParagraphCover
        index={index}
        desktop={desktop}
        header={header1}
        subHeader={subheader}
        header_eng={header1_eng}
        subHeader_eng={subheader_eng}
      />
    );
  } else {
    return (
      <ParagraphChapter
        index={index}
        text={text}
        text_eng={text_eng}
        time={time}
        bottom={bottom}
        plainText={type === 'text'}
        credits={credits}
        credits_eng={credits_eng}
        center
      />
    );
  }
};

export default determineContentType;
