import React, { useContext, useState, useEffect } from "react";
import "./paragraphChapter.css";
import Pagination from "./pagination";
import ReactMarkdown from "react-markdown";
import { useWindowSize } from "../helpers/index.js";
import header from "../images/ulkolinja_logo_pieni.png";
import { LanguageContext } from "../helpers/index.js";
import { desktopBreakpointWidth } from "../helpers/constants.js";
import GridContext from "../helpers/gridContext"

const Content = ({ plainText, index, credits, bottom, text, time }) => {
  return (
    <div className={`swiper-text ${plainText ? "plaintext" : "chapter"}`}>
      <Pagination splitScreen index={index} />
      <div
        className={
          plainText
            ? `plaintext-container ${credits ? "chapter-credits" : ""}`
            : `chapter-container ${bottom ? "chapter-bottom" : ""}`
        }
      >
        {false && <p>{time}</p>}
        <ReactMarkdown linkTarget="_blank" source={text} />
      </div>
    </div>
  );
};

const ParagraphChapter = ({
  credits,
  plainText,
  index,
  bottom,
  center,
  text,
  time,
  credits_eng,
  text_eng,
}) => {
  const [width, height] = useWindowSize();
  const position = () => {
    if (bottom && width <= desktopBreakpointWidth)
      return "swiper-position-bottom";
    if (center || width >= desktopBreakpointWidth)
      return "swiper-position-center";
  };

  const language = useContext(LanguageContext)
  const location = parseInt(useContext(GridContext).gridValues[index], 10) || 0;

  console.log(parseInt(useContext(GridContext).gridValues[index], 10) || 0)

  if (language === "eng") {
    text = text_eng;
    credits = credits_eng;
  }
  if (!text) return null;
  

  return (
    <div className={`${position()}`}>
      {width > 1025 && (
        <div className="desktop-grid">
          <div className="desktop-grid-row row-upper">
            {[...Array(3).keys()].map((e, i) => {
              return (
                <div className="desktop-grid-cell" style={{visibility: i === location ? "visible" : "hidden", width: i === location ? "40%" : "30%"}}>
                  <div className="desktop-grid-cell-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velits
                    esse cillum dolore eu fugiat nulla pariatur.
                  </div>
                </div>
              );
            })}
          </div>
          <div className="desktop-grid-row row-middle">
            {[...Array(3).keys()].map((e, i) => {
              return (
                <div className="desktop-grid-cell" style={{visibility: i + 3 === location ? "visible" : "hidden", width: i + 3 === location ? "40%" : "30%"}}>
                  <div className="desktop-grid-cell-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velits
                    esse cillum dolore eu fugiat nulla pariatur.
                  </div>
                </div>
              );
            })}
          </div>
          <div className="desktop-grid-row row-lower">
            {[...Array(3).keys()].map((e, i) => {
              return (
                <div className="desktop-grid-cell" style={{visibility: i + 6 === location ? "visible" : "hidden", width: i + 6 === location ? "40%" : "30%"}}>
                  <div className="desktop-grid-cell-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velits
                    esse cillum dolore eu fugiat nulla pariatur.
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {false && (
        <Content
          plainText={plainText}
          index={index}
          credits={credits}
          bottom={bottom}
          text={text}
          time={time}
        />
      )}
    </div>
  );
};

export default ParagraphChapter;
