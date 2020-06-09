import React from 'react';
import './arrows.css';
import Nuoli from '../images/nuoli.svg';
import nuoli from '../images/nuoli.svg';
import petrooliNuoli from '../images/nuoli_sininen.svg';
import PalloNuoli from '../images/nuoli_pallero.svg';
import Keyboard from '../images/keyboard.svg';
import {data} from '../data';
const Arrows = ({type, desktop, index}) => {
  if (type === 'cover' && !desktop) {
    return <Nuoli className="venezuela-arrow right mobile bounce" />;
  } else if (type === 'cover' && desktop) {
    return (
     // <PalloNuoli className="venezuela-arrow right desktop cover pallo" />

        <>
      <Nuoli className="venezuela-arrow right desktop graph"/>
      <Nuoli className="venezuela-arrow left desktop graph"/>
    <Keyboard className="keyboard-icon"/>
        </>
      );


    } else if (type === 'graph' && index !== data.length - 1 && desktop) {
      return (
        <>
      <Nuoli className="venezuela-arrow right desktop graph"/>
      <Nuoli className="venezuela-arrow left desktop graph"/>
    <Keyboard className="keyboard-icon"/>
        </>
      );
  } else if (type !== 'cover' && index !== data.length - 1 && desktop) {
    return (
      <>
    <Nuoli className="venezuela-arrow right desktop"/>
    <Nuoli className="venezuela-arrow left desktop"/>
    <Keyboard className="keyboard-icon"/>
      </>
    );
  } else if (index === data.length - 1 && desktop) {
    return <Nuoli className="venezuela-arrow left desktop" />;
  } else {
    return null;
  }
};

export default Arrows;