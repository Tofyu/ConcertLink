import { StyleSheet, View, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Text, TextInput, Button,PaperProvider } from 'react-native-paper';
import { db } from '../firebase'

const GroupRegisterScreen = ( {navigation, route} ) => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const { userID } = route.params

  const Submit = async() => {
    try {
      const docRef = await addDoc(collection(db, "volunteerGroups"), {
        name: name,
        location: location,
        email: email,
        phone: phone,
      });
      console.log("Document written with ID: ", docRef.id);

      //2. update user with the community
      const userDocRef = doc(db, 'volunteers', userID);

      // Update the user document with the new values
      updateDoc(userDocRef, {
        volunteerGroupID: docRef.id,
        volunteerGroupName: name,
        isManager: true,
      })
        .then(() => {
          console.log('User document updated successfully');
        })
        .catch((error) => {
          console.error('Error updating user document:', error);
        });

      navigation.navigate("Volunteer Events")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <SafeAreaView style={{flex:1, justifyContent:'space-around', margin:5}}>
      <View>
        <Text variant="titleMedium">Register</Text>
        <TextInput onChangeText = {setName} placeholder = 'Name' />
        <TextInput onChangeText = {setLocation} placeholder = 'Location' />
        <TextInput onChangeText = {setEmail} placeholder = 'Email' />
        <TextInput onChangeText = {setPhone} placeholder = 'Phone' />
      </View>
      <Button mode = 'elevated' onPress = {Submit} style = {{justifyContent: 'flex-end'}}>Register Group</Button>
    </SafeAreaView>
  )
}

export default GroupRegisterScreen

const styles = StyleSheet.create({})