import React from 'react';
import PropTypes from 'prop-types';
import Pin from '../icons/pin.svg';
import './Marker.css';

const Marker = (props) => {
  return (
      <div
        title={props.name}
        className={`marker ${props.marker.id === props.location.id ? 'bounce' : 'pin'}`}>

        <img src={Pin}
             width={48}
             height={64}
             alt={`Marker of location ${props.location.altname ? props.location.altname : props.location.title}`}
             onClick={(event) => props.eventHandler(props.location, props.location.position)}
             tabIndex={props.panel ? -1 : 0}
        />
      </div>
    );
}
export default Marker;

Marker.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.any.isRequired,
  eventHandler: PropTypes.func.isRequired
}