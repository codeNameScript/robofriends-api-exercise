import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundary';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      characters: [],
      searchfield: ''
    }
  }

  // change this
  componentDidMount() {
    fetch('https://api.genshin.dev/characters')
    .then(response => response.json())
    .then(characterNamesArray => this.setState({ characters: characterNamesArray }));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  render() {
    const { characters, searchfield } = this.state;
    const filteredRobots = characters.filter(robot => {
      return robot.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !characters.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
          <ErrorBoundry>
            <CardList characters={filteredRobots}/>
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;