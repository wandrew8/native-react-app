import React from 'react';
import Directory from './Directory';
import CampsiteInfo from './CampsiteInfoComponent';
import { View } from 'react-native';
import { CAMPSITES } from '../shared/campsites';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null,
        }
    }

    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId})
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Directory 
                    campsites={this.state.campsites} 
                    onCampsiteSelect={campsiteId => this.onCampsiteSelect(campsiteId)}
                />
                <CampsiteInfo 
                    campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}
                />
            </View>
        )
    }
}

export default Main;