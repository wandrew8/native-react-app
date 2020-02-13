import React from 'react';
import Directory from './Directory';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent'
import CampsiteInfo from './CampsiteInfoComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators';

const mapDispatchToProps = {
    fetchCampsites,
    fetchComments,
    fetchPartners,
    fetchPromotions,
}

const DirectoryNavigator = createStackNavigator({
    Directory: { 
        screen: Directory,
        navigationOptions: ({navigation}) => ({
            headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                    />
        })},
    CampsiteInfo: { screen: CampsiteInfo },
    },
    {
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#34ace0'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#34ace0'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                    name='home'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                    />
        })
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About },
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#34ace0'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                    name='info-circle'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                    />
        })
    }
)

const ContactNavigator = createStackNavigator (
    {
        Contact: { screen: Contact },
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#34ace0'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                    name='address-card'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                    />
        })
    }
)

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>NuCamp</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
)

const MainNavigator = createDrawerNavigator(
    {
        Home: { 
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }  
        },
        Directory: { 
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }  
        },
        About: { 
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }  
        },
        Contact: { 
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }  
        },
    },
    {
        drawerBackgroundColor: '#34ace0',
        contentOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            itemsContainerStyle: {
              marginVertical: 0,
            },
        },
        contentComponent: CustomDrawerContentComponent,
}
)

class Main extends React.Component {

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPartners();
        this.props.fetchPromotions();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
                }}>
                <MainNavigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24,
    },
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#227093',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24,
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60,
    }

})

export default connect(null, mapDispatchToProps)(Main);