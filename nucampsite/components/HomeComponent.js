import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseURL';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners,
    }
};

function RenderItems({item}) {
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}
            >
                <Text
                    style={{margin:10}}>
                        {item.description}
                </Text>
            </Card>
        )
    }
    return <View />
}

class Home extends React.Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
                <RenderItems
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]} />
                <RenderItems
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} />
                <RenderItems
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]} />    
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home);