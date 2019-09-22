import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import ItemComponent from './ItemComponent';

import { db } from './src/config';
let itemsRef = db.ref('/items');

export default class List extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.parentView}>
        <View style={styles.backView}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Additem')}} style={styles.BackButton}>
              <Text style={styles.Back}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Additem')}} style={styles.addItem}>
              <Text style={{fontSize:18,padding:2}}>Add Name</Text>
          </TouchableOpacity>
        </View>
        </View>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} />
        ) : (
          <Text>No items</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  },
  Back:{
    fontSize:18,
    padding:2,
    textDecorationLine:'underline'
  },
  BackButton:{
    width:'50%',
    marginRight:20,
    justifyContent:'center',
    alignItems:'center'
  },
  addItem:{
    backgroundColor:'white',
    alignSelf:'flex-end',
    width:'80%',
    marginRight:20,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  backView:{
    width:'50%',
    height:'100%',
    justifyContent:'center'
  },
  parentView:{
    height:50,
    width:'100%',
    backgroundColor:'#decfce',
    flexDirection:'row'
  },
  buttonView:{
    width:'50%',
    height:'100%',
    justifyContent:'center'
  }
});