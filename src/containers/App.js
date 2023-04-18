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
      // this is where the array names will go ['ayaka', 'otherNames',...]
      characters: [],
      // this is where the array of Full names will go ['Kamisato Ayaka', ...]
      charactersFullNames: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    // fetching characters
    fetch('https://api.genshin.dev/characters')
    .then(response => response.json())
    .then(characterNamesArray => {
      this.setState({ characters: characterNamesArray })
      Promise.all(
        characterNamesArray.map(characterName =>
          // fetching character data
          fetch(`https://api.genshin.dev/characters/${characterName}`)
            .then(resp => resp.json())
            .catch(err => console.log('Oh no', err))
        )
      ).then(respCharacterData => {
        // return certain value from object(json)
        // https://stackoverflow.com/questions/25469972/getting-the-values-for-a-specific-key-from-all-objects-in-an-array
        const characterFullNamesArray = respCharacterData.map((character) => {
          return character.name;
        })
        this.setState({ charactersFullNames: characterFullNamesArray });
      });
    })
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  render() {
    const { characters, charactersFullNames, searchfield } = this.state;

    const filteredCharacters = characters.filter((character, i) => {
      // return character from characters when true
      // You have to parse to string when its from an array dummy
      if (String(charactersFullNames[i]).toLowerCase().includes(searchfield.toLowerCase())) {
        return character;
      }
    })

    return !characters.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <div className='Appjs-flex'>
            <h1 className='f1'>Genshin Friends</h1>
            <SearchBox searchChange={this.onSearchChange} />
          </div>
          <Scroll>
            <ErrorBoundry>
              <CardList characters={filteredCharacters} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
  }
}

export default App;