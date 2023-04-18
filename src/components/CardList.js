import React, { Component } from 'react';
import Card from './Card.js';

class CardList extends Component {
    // props  ['ayaka', 'otherNames',...]
    constructor(props) {
        super(props)
        this.state = {
            // this is where the json object will go [{name:'charName', other:'data', ...}, ...]
            characterData: []
        }
    }

    fetchCharacterData() {
        const { characters } = this.props;
        // wait for all request to resolve before setState
        Promise.all(
            characters.map(characterName =>
                // fetching character data
                fetch(`https://api.genshin.dev/characters/${characterName}`)
                    .then(resp => resp.json())
                    .catch(err => console.log('Oh no', err))
            )
        ).then(respCharacterData => {
            this.setState({ characterData: respCharacterData });
        });
    }

    componentDidMount() {
        this.fetchCharacterData();
    }

    // https://legacy.reactjs.org/docs/react-component.html#componentdidupdate
    componentDidUpdate(prevProps) {
        // only run when prop changed to prevent infinite loop
        if (prevProps.characters !== this.props.characters) {
            this.fetchCharacterData();
        }
    }

    render() {
        // props ['ayaka', 'otherNames',...]
        const { characters } = this.props;
        return (
            <div>
                {
                    this.state.characterData.map((character, i) => {  // character {name:'charName', other:'data', ...}
                        return (
                            <Card
                                key={i}
                                id={character.name}
                                name={character.name}
                                nation={character.nation}
                                vision={character.vision}
                                weapon={character.weapon}
                                // this API does not store images in the json object. We have to get them seperately
                                imgsrc={`https://api.genshin.dev/characters/${characters[i]}/card`}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default CardList;