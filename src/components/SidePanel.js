import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import Hamburger from './Hamburger';
import Item from './Item'
import './SidePanel.css';

class SidePanel extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    eventHandler: PropTypes.func.isRequired,
  }

  state = {
    query: '',
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  queryHandler = (query) => {
    this.setState({ query: query })
    this.props.filterLocations(query)
  }

  render () {
    const { toggle, panel, locations, eventHandler, openModal } = this.props
    const { query } = this.state

    return (
      <aside className={`side-panel ${panel ? 'show' : 'hidden'}`}>
        <Hamburger
          toggle={toggle}
          panel={panel}
        />

        <div className="side-panel-bar">
          <DebounceInput
            type="text"
            placeholder="Filter..."
            onChange={(event) => this.queryHandler(event.target.value)}
            value={query}
            debounceTimeout={500}
            tabIndex={panel ? 0 : -1}
            aria-label="Filter locations"
            aria-hidden={panel ? false : true}
          />
        </div>

        <div className="places-list" tabIndex={panel ? 0 : -1} aria-label={`List of ${locations.length} locations`}>
            {locations.map(location => (
              <Item
                key={location.id}
                location={location}
                eventHandler={eventHandler}
                getPhotos={this.props.getPhotos}
                openModal={openModal}
                panel={panel}
              />
            ))}
            {locations.length === 0 && (
              <p className="message">No results</p>
            )}
        </div>
      </aside>
    );
  }
}

export default SidePanel;