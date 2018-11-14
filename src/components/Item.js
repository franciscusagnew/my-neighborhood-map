import React, { Component } from 'react';
import * as FocusTrap from '../utils/FocusTrap';
import './Item.css';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };

    // This binding is necessary to make `this` work in the 
    // callback founded solution on StackOverflow
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (location, pos) => {
    if (!this.state.isToggleOn) {
      this.props.eventHandler(location, pos);
    }

    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  eventHandler = (location, pos) => {
    this.props.eventHandler(location, pos);
  }

  render() {
    const { location, openModal, panel } = this.props
    const { isToggleOn } = this.state

    return (
      <div className={`item details-${isToggleOn ? 'show' : 'hidden'}`}
           tabIndex={panel ? 0 : -1}
           aria-label={( location.altname )
                       ?
                       ( `Location ${location.name}, in english ${location.altname}, category: ${location.category.join(', ')} click for more details` )
                       :
                       ( `Location ${location.title}, ${location.category.join(', ')} click for more details`)
                       }>
        <a aria-disabled={isToggleOn ? true : false}
           aria-label={`Rollout popup for ${location.name}`}
           onClick={(event) => {
             event.preventDefault();
             this.handleClick(location, location.position)
           }}>{location.name}</a>

        {/* If location name is clicked then rollups some extra details */}
        {isToggleOn ? (
        <div className="details">

          <h4>{location.altname ? location.altname : `${location.title} ${location.category[0]}`}</h4>

          <ul>
            {location.category.map(tag => (
              <li key={tag} className="tag">{tag}</li>
            ))}
          </ul>

          <ul className="item-list-images">
            {location.photos.map(photo => (
              <li key={photo}
                  style={{ backgroundImage: `url(${photo})` }}
                  className="photo"
                  role="img">
              </li>
            ))}
          </ul>

          <button className="details-button"
                  aria-label={`Click for details of location ${location.name}`}
                  onClick={(event) => {
                    openModal()
                    FocusTrap.onFocus(); // FOCUS TRAP function to set focus on modal window of location details, <DetailsPage/> Component
                  }}>Details</button>

        </div>
        ) : undefined}

      </div>
    );
  }
}

export default Item;