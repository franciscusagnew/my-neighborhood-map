import React from 'react';

import './Hamburger.css'

const Hamburger = ({ toggle, state }) => {
    return (
      <nav tabIndex="0" aria-label="Open or Close filter and list of locations"
        className="hamburger"
        onClick={(event) => toggle(state)}
        style={{
          backgroundColor: '#fff',
          width: 60,
          height: 60
        }}>
        <svg>
          <rect x={10} y={15} className="hamburger-element" width={40} height={4}/>
          <rect x={10} y={27} className="hamburger-element" width={40} height={4}/>
          <rect x={10} y={39} className="hamburger-element" width={40} height={4}/>
        </svg>
      </nav>
    );
}

export default Hamburger;
