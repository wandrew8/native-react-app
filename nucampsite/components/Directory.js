import React, { Component } from 'react';
import Loading from './LoadingComponent';
import { FlatList, View } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
    }
};

class Directory extends Component {

    static navigationOptions = {
        title: 'Directory',
    }
    render() {
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({item}) => {
        return (
            <Animatable.View animation='fadeInRightBig' duration={500}>
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    imageSrc={{uri: baseUrl + item.image}}
                    onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
                    />
            </Animatable.View>
        )
    }
    if (this.props.campsites.errMess) {
        return (
            <View>
                <Text>{this.props.campsites.errMess}</Text>
            </View>
        )
    }
    if (this.props.campsites.isLoading) {
        return (
            <Loading />
        )
    }
    return (
        <FlatList
            data={this.props.campsites.campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        ></FlatList>
    )
    }
}

export default connect(mapStateToProps)(Directory);