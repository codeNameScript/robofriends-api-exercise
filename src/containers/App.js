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
        console.log(characterDatatmp);
        // make an array of full names
        const characterFullNamesArray = characterDatatmp.map((value) => {
          return value.name;
        })
          this.setState({ charactersFullNames: characterFullNamesArray });
          console.log(this.state.characters)
          console.log(this.state.charactersFullNames)
      });
    })
  }

  // the name of characters in the initial array is differnet from the data I am showing 
  // e.g. in initial array ['ayaka']    [{name: 'Kamisato Ayaka'}]
  // searching kamisato will filter out ayaka even though that is her full name
  // I have to think of different logic for filtering to fix this.
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  // https://api.genshin.dev/characters    returns ['ayaka', 'otherCharNames']
  // https://api.genshin.dev/characters/ayaka      [{name: 'Kamisato Ayaka', other: 'data'}]
  
  render() {
    const { characters, charactersFullNames, searchfield } = this.state;
    // console.log(characters);
    // character.name will not fix it because that is not how the api is structured
    // I think I have to fetch like in the CardList if I really want to search by full name

    // if i filter withd the full names array the cardlist will break

    // console.log(charactersFullNames);
    // const filteredCharacters = [];
    // console.log(String(charactersFullNames[0]).toLowerCase());
    // characters.forEach((character, i) => {
    //   if (String(charactersFullNames[i]).toLowerCase().includes(searchfield.toLowerCase())) {
    //     const filteredCharacters = filteredCharacters.push(character);
    //   }
    // })

    const filteredCharacters = characters.filter((character, i) => {
      // You have to parse to string when its from an array dummy
      if (String(charactersFullNames[i]).toLowerCase().includes(searchfield.toLowerCase())) {
        return character;
      }
    })
    // console.log(filteredCharacters);
    return !characters.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
          <ErrorBoundry>
            <CardList characters={filteredCharacters}/>
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;