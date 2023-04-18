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

  componentDidMount() {
    fetch('https://api.genshin.dev/characters')
    .then(response => response.json())
    .then(characterNamesArray => this.setState({ characters: characterNamesArray }));
  }

  // the name of characters in the initial array is differnet from the data I am showing 
  // e.g. in initial array ['ayaka']    [{name: 'Kamisato Ayaka'}]
  // searching kamisato will filter out ayaka even though that is her full name
  // I have to think of different logic for filtering to fix this.
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }
  
  render() {
    const { characters, searchfield } = this.state;
    // character.name will not fix it because that is not how the api is structured
    // I think I have to fetch like in the CardList if I really want to search by full name
    const filteredRobots = characters.filter(robot => {
      return robot.toLowerCase().includes(searchfield.toLowerCase());
    })
    console.log(filteredRobots);
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