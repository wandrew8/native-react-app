import React from 'react';
import Directory from './Directory';
import { CAMPSITES } from '../shared/campsites';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            campsites: CAMPSITES,
        }
    }
    render() {
        return (
            <Directory campsites={this.state.campsites}></Directory>
        )
    }
}

export default Main;