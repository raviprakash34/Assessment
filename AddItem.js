import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import { db } from './src/config';

let addItem = item => {
  db.ref('/items').push({
    name: item
  });
};

export default class AddItem extends Component {
  state = {
    name: '',
    userName:''
  };

  componentDidMount(){


  
    AsyncStorage.getItem("name").then((value)=>{
        this.setState({
          userName:value,
          isLoading:false
        })
    //    alert(this.state.userId)
    })
}

  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  };
  handleSubmit = () => {
    addItem(this.state.name);
    this.props.navigation.navigate('List');
    Alert.alert('Item saved successfully');
  };

  render() {
    const {params}=this.props.navigation.state;
    return (
      <View style={styles.main}>
        <View style={styles.backView}>
         <View style={{width:'50%'}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Splash')}} style={styles.backButton}>
            <Text style={{textDecorationLine:'underline'}}>Back</Text>
          </TouchableOpacity>
         </View>
         <View style={{width:'50%'}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('List')}} style={styles.fetch}>
              <Text style={{fontSize:14,padding:2}}>View Name</Text>
          </TouchableOpacity>
        </View>
        </View> 
        <View style={styles.view}>
          <View style={{width:'70%',justifyContent:'center',alignItems:'center'}}>
            <Text>Hi, {this.state.userName}</Text>
          </View>
          <Text style={styles.title}>Add Friend Name</Text>
          <TextInput placeholder={'Enter Name'} style={styles.itemInput} onChange={this.handleChange} />
          <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
          >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  title: {
    marginBottom: 20,
    fontSize: 21,
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'black'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    width:'40%',
    flexDirection: 'row',
    backgroundColor: '#6490e3',
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf:'center',
    borderTopLeftRadius:20,
    borderBottomRightRadius:20
  },
  view:{
      height:100,
      width:'80%',
      alignSelf:'center',
      marginTop:80
  },
  backView:{
    height:50,
    backgroundColor:'#decfce',
    width:'100%',
    flexDirection:'row',
    alignItems:'center'
  },
  backButton:{
    height:50,
    backgroundColor:'#decfce',
    width:'50%',
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center'
  },fetch:{
    backgroundColor:'white',
    width:'50%',
    marginRight:10,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  }
});