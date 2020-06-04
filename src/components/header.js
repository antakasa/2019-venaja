import React from 'react';
import Pagination from './pagination';
import './header.css';
import {data} from '../data';
import Tap from '../images/tap_toka.svg';
import logo from '../images/ulkolinja_logo_valkoinen.png';
const Header = ({index, splitScreen, nextSlideFunc, mobile}) => {
  const cssClasses = () => {
    if (!splitScreen) {
      return 'pagination full-screen-pagination';
    } else if (splitScreen) {
      return 'pagination split-screen-pagination';
    } else {
      return 'pagination';
    }
  };

  let notVisible = () => {
    const slide = data[index];
    const testBooleans = [slide.type === 'finalPage', slide.credits];
    if (testBooleans.indexOf(true) >= 0) {
      return true;
    } else return false;
  };

  ['finalPage', 'credits1', 'credits2']; // logo not visible on these slides

  return (
    <div className={'venezuela-header'}>
      <Pagination index={index} />
      {index > 0 && (
        <div className="logo-and-instructions">
          {
            <>
              <img
                src={logo}
                className={mobile ? "venezuela-ul-logo": "venezuela-ul-logo desktop"}
                alt="Ulkolinjan logo"
                style={{
                  visibility: notVisible() ? 'hidden' : '',
                }}
              />
              {mobile &&
                index !== data.length - 1 && (
                  <div onClick={() => nextSlideFunc()}>
                   <Tap/>
                  </div>
                )}
            </>
          }
        </div>
      )}
    </div>
  );
};

export default Header;
