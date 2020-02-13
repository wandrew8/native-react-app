import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';


function RenderItems({item}) {
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={require('./images/react-lake.jpg')}
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
    constructor(props) {
        super(props)
        this.state = {
            campsites: CAMPSITES,
            partners: PARTNERS,
            promotions: PROMOTIONS,
        };
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
                <RenderItems
                    item={this.state.campsites.filter(campsite => campsite.featured)[0]} />
                <RenderItems
                    item={this.state.promotions.filter(promotion => promotion.featured)[0]} />
                <RenderItems
                    item={this.state.partners.filter(partner => partner.featured)[0]} />    
            </ScrollView>
        )
    }
}

export default Home;