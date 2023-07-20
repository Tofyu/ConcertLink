import { StyleSheet,  View, ImageBackground } from 'react-native'
import { Button, Input } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import {  addDoc, collection } from "firebase/firestore";
import { db } from '../firebase';

const CommunityRegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("");
    const [size, setSize] = useState(0);
    const [description, setDescription] = useState("");
    
    
    
    const Register = async ()=>{
      try {
        const docRef = await addDoc(collection(db, "communities"), {
          name: name,
          email: email,
          description: description,
          address: address,
          city: city,
          state: state,
          phone: phone,
          zip: zip,
          size: size
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    
  return (
    
    
    <View style={{marginTop:230}}>
        
      <Input
        placeholder="Enter your group's name"
        leftIcon={{ type: "material", name: "account-group" }}
        styles={styles}
        label="Name"
        onChangeText={setName}
      />

       <Input
        placeholder="Enter your group's email"
        leftIcon={{ type: "material", name: "email" }}
        styles={styles}
        label="Email"
        onChangeText={setEmail}
      />

      <Input
        placeholder="Enter your group's address"
        leftIcon={{ type: "material", name: "office-building" }}
        styles={styles}
        label="Address"
        onChangeText={setAddress}
      />

      <Input
        placeholder="Enter your group's city"
        leftIcon={{ type: "material", name: "city" }}
        styles={styles}
        label="City"
        onChangeText={setCity}
        
      />

      <Input
        placeholder="Enter your group's state"
        leftIcon={{ type: "material", name: "image-filter-hdr-outline" }}
        styles={styles}
        label="State"
        onChangeText={setState}
        
      />

        <Input
        placeholder="Enter your group's phone number"
        leftIcon={{ type: "material", name: "phone" }}
        styles={styles}
        label="Phone"
        onChangeText={setPhone}
        
      />    

      <Input
        placeholder="Enter your zip code"
        leftIcon={{ type: "material", name: "form-textbox-password" }}
        styles={styles}
        label="Zip"
        onChangeText={setZip}
       
      />

        <Input
        placeholder="Enter your group's size"
        leftIcon={{ type: "material", name: "numeric" }}
        styles={styles}
        label="Size"
        onChangeText={setSize}
        
      />

        <Input
        placeholder="Enter your group's description"
        leftIcon={{ type: "material", name: "image-text" }}
        styles={styles}
        label="Description"
        onChangeText={setDescription}
        
      />


      <View style={{alignItems:'center'}}>
      <Button 
      title="Sign up" 
      type = "outline"
      buttonStyle={{borderColor: 'rgba(39, 213, 245, 0.8)', backgroundColor: 'rgba(209, 248, 255, 0.8)', borderRadius: 15, borderWidth: 2 }} 
      titleStyle={{ color: 'rgba(39, 213, 245, 0.8)', fontWeight: 'bold', fontSize: 25 }} 
      onPress={Register} 
      style={{padding: 10, width:350}}/>

      <Button 
      title="Move to Login" 
      buttonStyle={{backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
      titleStyle={{ fontWeight: 'bold', fontSize: 25 }} 
      icon={{name: 'arrow-right',type: 'font-awesome',size: 20,color: 'white',}}
      onPress={()=>navigation.navigate('User Login')} 
      style={{padding: 10, width:350, marginVertical:5}}/>
      </View>

    </View>
    
    
  )
}

export default CommunityRegisterScreen

const styles = StyleSheet.create({})
