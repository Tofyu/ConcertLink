import { Text, StyleSheet,  View, FlatList, TextInput,ImageBackground, TouchableOpacity } from 'react-native'
import { Button, Input } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import {  doc, getDocs, addDoc, collection  } from "firebase/firestore";
import { db } from '../firebase';

const EditCommunityUserScreen = ({ navigation }) => {
    const [users, setUsers] = useState("");

  useEffect(async()=> {
    const querySnapshot = await getDocs(collection(db, 'communities', "Zs6zfsZ2ApDPW8Vv6UoZ", "users"));
    const docsData = querySnapshot.docs.map((doc) => ({ id:doc.id, name: doc.data().name, email: doc.data().email, phone: doc.data().phone, birthday: doc.data().birthday }));
    setUsers(docsData);

  }, [])

  useEffect(() => {
    console.log("*********" , users)
    console.log("user: " + name + "\n")
  })

const handleUpdate = (item) => {
  // Update the item in Firebase
  firebase.database().ref('users/' + item.key).update({
    name: item.name,
    email: item.email,
  })
    .then(() => {
      console.log('Item updated successfully in Firebase');
    })
    .catch((error) => {
      console.log('Error updating item in Firebase: ', error);
    });
};

 const renderItem = ({ item }) =>(
  <view>
    <Text> value = {item.name}</Text>
    <Text> value = {item.email}</Text>
    <Text> value = {item.phone}</Text>
    <Text> value = {item.birthday}</Text>
    
    <Button title="Update" onPress={() => handleUpdate(item)} />
    <TouchableOpacity onPress={() => props.deleteTodo(index)}>
    </TouchableOpacity>

    
  </view>
 );

  return (

    <View>
      <Text style ={styles.title}>Edit Users</Text>

      <FlatList
      data={users}
      renderItem={renderItem}
      />
      
    </View>
  )
}

export default EditCommunityUserScreen

const styles = StyleSheet.create({
  title:{
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 2,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  text1:{
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center'
  }
})

