import React from 'react';
import * as FocusTrap from '../utils/FocusTrap';
import './InfoWindow.css';

const InfoWindow = ({ info, infoWindow, closeInfoWindow, openModal }) => {
    return (
      <div id="talkbubble" className="info-window">
        <h2>{info.name}</h2>
        <h3>{info.altname ? info.altname : `${info.title} ${info.category[0]}`}</h3>
        <button className="details-button"
                onClick={(event) => {
                  openModal();
                  // FOCUS TRAP function to set focus on modal window of location details, 
                  // <DetailsPage/> Component
                  FocusTrap.onFocus();
                }}>Details</button>
        <button className="close"
                onClick={(event) => closeInfoWindow()}>Close</button>
        <div id="triangle"></div>
      </div>
    );
  }

export default InfoWindow;
