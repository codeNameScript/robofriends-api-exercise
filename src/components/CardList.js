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
        /*
        Promise.all
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
            The fulfillment value is an array of fullfilement values,
            in the order of the promises passed,
            REGARDLESS of the completion order
        */
        // this has to be named the same as the prop you passed in App.js
        const { characters } = this.props;
        Promise.all(
            characters.map(characterName =>
                fetch(`https://api.genshin.dev/characters/${characterName}`)
                    .then(resp => resp.json())
                    .catch(err => console.log('Oh no', err))
            )
        ).then(characterDatatmp => {
            this.setState({ characterData: characterDatatmp });
            // console.log(this.state.characterData)
        });
    }

    // removing this removes flickering of component
    // We don't need this  anymore
    // I don't know why
    // probably because I fixed the filter in App.js
    // componentDidUpdate(prevProps) {
    //     if (prevProps.characters !== this.props.characters) {
    //         this.setState({ characterData: [] });

    //         const { characters } = this.props;
    //         Promise.all(
    //             characters.map(characterName =>
    //                 fetch(`https://api.genshin.dev/characters/${characterName}`)
    //                     .then(resp => resp.json())
    //                     .catch(err => console.log('Oh no', err))
    //             )
    //         ).then(characterDatatmp => {
    //             this.setState({ characterData: characterDatatmp });
    //             // console.log(this.state.characterData)
    //         });
    //     }
    // }

    render() {
        const { characters } = this.props;
        // console.log(this.props)
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