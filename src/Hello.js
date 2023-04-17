import React, { Component } from 'react';
import './Hello.css';

class Hello extends Component {
    render () {
        return (
            <div className="f1 tc">
                <h1>Hello</h1>
                <p>Welcome to react</p>
                <p>{this.props.greetings}</p>
            </div>
        );
    }
}

// const Hello = (props) => {
//     return (
//         <div className="f1 tc">
//             <h1>Hello</h1>
//             <p>Welcome to react</p>
//             <p>{props.greetings}</p>
//         </div>
//     );
// }

export default Hello;