import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
            username: '',
            password: '',
            remember: false,
        };
    }

    static navigationOptions = {
        title: 'Login'
    }

    handleLogin() {
        console.log(JSON.stringify(this.state))
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({
                username: this.state.username, password: this.state.password
            })).catch(error => console.log('could not save the user info' + error))
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch(error => console.log('could not delete the user info' + error));
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
        .then(userdata => {
            const userinfo = JSON.parse(userdata)
            if (userinfo) {
                this.setState({ username: userinfo.username });
                this.setState({ password: userinfo.password });
                this.setState({ remember: true });

            }
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <Input  
                    placeholder='Username'
                    leftIcon={{ name: 'user-o', type: 'font-awesome' }}
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon} />
                <Input  
                    placeholder='Password'
                    leftIcon={{ name: 'key', type: 'font-awesome' }}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon} />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckBox} />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        color='#5637DD' />
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        marginRight: 10
    },
    formIcon: {
        padding: 10,
    },
    formCheckBox: {
        margin: 10,
        backgroundColor: null,
    },
    formButton: {
        margin: 40,
    }
})

export default Login;