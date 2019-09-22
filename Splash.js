
import React, { Component } from 'react';
 
import { View, StyleSheet, Text, Alert, Image,AsyncStorage,TouchableOpacity } from 'react-native';
import { db } from './src/config';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
 
export default class Splash extends Component {
 
  constructor() {
    super();
    this.state = {
      session:'',
      user_name: '',
      avatar_url: '',
      avatar_show: false
    }
  }
 
  componentDidMount(){
    AsyncStorage.getItem("name").then((value)=>{
        this.setState({
          user_name:value,
          isLoading:false
        })
    //    alert(this.state.userId)
    })
    AsyncStorage.getItem("pic").then((value)=>{
        this.setState({
          avatar_url:value,
          avatar_show:true,
          isLoading:false
        })
    //    alert(this.state.userId)
    })
}



  handleSignUp = () => {
    // TODO: Firebase stuff...
      console.log('handleSignUp')
      db.createUserWithEmailAndPassword(this.state.user_name,this.state.user_name)
    .then()
    .catch(error => this.setState({ errorMessage: error.message }));
    }

  get_Response_Info = (error, result) => {
    if (error) {
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
        
      this.setState({ user_name: 'Welcome' + ' ' + result.name });
 
      this.setState({ avatar_url: result.picture.data.url });
 
      this.setState({ avatar_show: true })
 
      console.log(result);
      AsyncStorage.setItem("name",result.name);
      AsyncStorage.setItem("pic",result.picture.data.url);
    }
  }
 
  onLogout = () => {
 
    this.setState({ user_name: null, avatar_url: null, avatar_show: false });
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('pic');
  }
 
  render() {
    return (
      <View style={styles.container}>
 
 
        {this.state.avatar_url ?
          <Image
            source={{ uri: this.state.avatar_url }}
            style={styles.imageStyle} /> : null}
 
        <Text style={styles.text}> {this.state.user_name} </Text>
 
        <LoginButton
          readPermissions={['public_profile']}
          onLoginFinished={(error, result) => {
            if (error) {
              console.log(error.message);
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data.accessToken.toString());
 
                const processRequest = new GraphRequest(
                  '/me?fields=name,picture.type(large)',
                  null,
                  this.get_Response_Info
                );
                // Start the graph request.
                new GraphRequestManager().addRequest(processRequest).start();
 
              });
            }
          }}
          onLogoutFinished={this.onLogout}
        />
    <TouchableOpacity style={styles.todo}  onPress={()=>{this.props.navigation.navigate('Additem',{name:this.state.user_name})}}>
        <Text style={styles.todotext}>GO to TODO</Text>
    </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
 
  text: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    padding: 20
  },
 
  imageStyle: {
 
    width: 200,
    height: 300,
    resizeMode: 'contain'
 
  },
  todo:{
    width:'40%',
    alignSelf:'center',
    height:35,
    marginTop:35,
    backgroundColor:'#6490e3',
    borderTopLeftRadius:15,
    borderBottomRightRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
  todotext:{
      color:'white',
      fontSize:14,
      fontWeight:'600'
  }
});