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
        // this has to be named the same as the prop you passed in App.js
        const { characters } = this.props;
        const characterDatatmp = [];

        // console.log(characters)
        characters.forEach(characterName => {
            fetch(`https://api.genshin.dev/characters/${characterName}`)
            .then(resp => resp.json())
            .then(data => {
                characterDatatmp.push(data)
                this.setState({ characterData: characterDatatmp })
                console.log(this.state.characterData[0]);
            })
            .catch(err => console.log('Oh no', err))
        });
    }
    
    render () {
        // console.log(this.state.characterData[0].name);
        const { characters } = this.props;
        return (
            <div>
                {
                    this.state.characterData.map((character, i) => {
                        // you have to return manually if you use {} notation in map dummy
                        return (
                            <Card
                            id={character.name}
                            name={character.name}
                            nation={character.nation}
                            vision={character.vision}
                            weapon={character.weapon}
                            // this API does not store images in the object. We have to get them seperately
                            imgsrc={`https://api.genshin.dev/characters/${characters[i]}/card`}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

// const CardList = ({ characters }) => {
//     return (
//         <div>
//             {
//                 characters.map((characterName, i) => {
//                     fetch(`https://api.genshin.dev/characters/${characterName}`)
//                     .then(resp => resp.json())
//                     .then(data => {
//                         return (
//                             <Card
//                             key={i}
//                             id={data.name}
//                             name={data.name}
//                             nation={data.nation}
//                             vision={data.vision}
//                             weapon={data.weapon}
//                             // this API does not store images in the object. We have to get them seperately
//                             imagesrc={`https://api.genshin.dev/characters/${characterName}/card`}
//                             />
//                         );
//                     })
//                 })
//             }
//         </div>
//     );
// }

export default CardList;