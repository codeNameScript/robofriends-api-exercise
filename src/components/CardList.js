import React, { Component } from 'react';
import Card from './Card.js';

class CardList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characterData: []
        }
    }

    componentDidMount() {
        const { characters } = this.props;
        Promise.all(
            characters.map(characterName =>
                fetch(`https://api.genshin.dev/characters/${characterName}`)
                    .then(resp => resp.json())
                    .catch(err => console.log('Oh no', err))
            )
        ).then(characterDatatmp => {
            this.setState({ characterData: characterDatatmp });
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.characters !== this.props.characters) {
            const { characters } = this.props;
            Promise.all(
                characters.map(characterName =>
                    fetch(`https://api.genshin.dev/characters/${characterName}`)
                        .then(resp => resp.json())
                        .catch(err => console.log('Oh no', err))
                )
            ).then(characterDatatmp => {
                this.setState({ characterData: characterDatatmp });
            })
        }
    }

    render() {
        const { characters } = this.props;
        return (
            <div>
                {
                    this.state.characterData.map((character, i) => {
                        if (characters.includes(characters[i])) {
                            // you have to return manually if you use {} notation in map dummy
                            return (
                                <Card
                                    key={i}
                                    id={character.name}
                                    name={character.name}
                                    nation={character.nation}
                                    vision={character.vision}
                                    weapon={character.weapon}
                                    // this API does not store images in the object. We have to get them seperately
                                    imgsrc={`https://api.genshin.dev/characters/${characters[i]}/card`}
                                />
                            );
                        }
                    })
                }
            </div>
        );
    }
}

export default CardList;