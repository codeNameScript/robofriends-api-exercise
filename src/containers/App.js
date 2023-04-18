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
      charactersFullNames: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://api.genshin.dev/characters')
    .then(response => response.json())
    .then(characterNamesArray => {
      this.setState({ characters: characterNamesArray })
      Promise.all(
        characterNamesArray.map(characterName =>
          fetch(`https://api.genshin.dev/characters/${characterName}`)
            .then(resp => resp.json())
            .catch(err => console.log('Oh no', err))
        )
      ).then(characterDatatmp => {
        const characterFullNamesArray = characterDatatmp.map((value) => {
          return value.name;
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