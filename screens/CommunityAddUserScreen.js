import { StyleSheet,  View, ImageBackground } from 'react-native'
import { Button, Input } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import {  addDoc, collection, doc } from "firebase/firestore";
import { db } from '../firebase';

const CommunityAddUserScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    

  const AddUser = async ()=>{
    try {
      const docRef = collection(db, "communities", "Zs6zfsZ2ApDPW8Vv6UoZ", "users");
      addDoc(docRef,{
        name: name,
        email: email,
        phone: phone,
        birthday: birthday
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  return (
    
    <View style={{marginTop:230}}>
        
      <Input
        placeholder="Enter your user's name"
        leftIcon={{ type: "material", name: "badge" }}
        styles={styles}
        label="Name"
        onChangeText={setName}
      />

      <Input
        placeholder="Enter your user's email"
        leftIcon={{ type: "material", name: "email" }}
        styles={styles}
        label="Email"
        onChangeText={setEmail}
      />

      <Input
        placeholder="Enter your user's phone number"
        leftIcon={{ type: "material", name: "phone" }}
        styles={styles}
        label="Phone"
        onChangeText={setPhone}
        
      />

      <Input
        placeholder="Enter your user's Birthday"
        leftIcon={{ type: "material", name: "calendar-range" }}
        styles={styles}
        label="Birthday"
        onChangeText={setBirthday}
        
      />

      <View style={{alignItems:'center'}}>
      <Button 
      title="Confirm" 
      type = "outline"
      buttonStyle={{borderColor: 'rgba(39, 213, 245, 0.8)', backgroundColor: 'rgba(209, 248, 255, 0.8)', borderRadius: 15, borderWidth: 2 }} 
      titleStyle={{ color: 'rgba(39, 213, 245, 0.8)', fontWeight: 'bold', fontSize: 25 }} 
      onPress={AddUser} 
      style={{padding: 10, width:350}}/>

      </View>

    </View>
    
  )
}

export default CommunityAddUserScreen

const styles = StyleSheet.create({})
