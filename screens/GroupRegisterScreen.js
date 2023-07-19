import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../firebase'

const GroupRegisterScreen = () => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const Submit = async() => {
    try {
      const docRef = await addDoc(collection(db, "groups"), {
        name: name,
        location: location,
        email: email,
        phone: phone,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <View>
      <Text>Register</Text>
      <TextInput onChangeText = {setName} placeholder = 'Name' />
      <TextInput onChangeText = {setLocation} placeholder = 'Location' />
      <TextInput onChangeText = {setEmail} placeholder = 'Email' />
      <TextInput onChangeText = {setPhone} placeholder = 'Phone' />
      <Button title = "Register" onPress = {Submit}/>
    </View>
  )
}

export default GroupRegisterScreen

const styles = StyleSheet.create({})
