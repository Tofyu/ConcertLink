import { Text, StyleSheet,  View, ImageBackground } from 'react-native'
import { Button, Input } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import {  doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from '../firebase';

const CommunityProfileScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("");
    const [size, setSize] = useState(0);
    const [description, setDescription] = useState("");

  useEffect(async()=> {
    const docRef = doc(db, "communities", "dzUgehZ31uZ87YBBk5SA");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const community = docSnap.data()
        setName(community.name)
        setEmail(community.email)
        setAddress(community.address)
        setCity(community.city)
        setState(community.state)
        setPhone(community.phone)
        setZip(community.zip)
        setSize(community.size)
        setDescription(community.description)
    console.log("Document data:", docSnap.data());
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
  }, [])

  useEffect(() => {
    console.log("community: " + name + "\n")
  })

const save = () => {db.collection("communities").doc("dzUgehZ31uZ87YBBk5SA").update({         
    name: name,
    email: email,
    description: description,
    address: address,
    city: city,
    state: state,
    phone: phone,
    zip: zip,
    size: size })
 .then(() => { console.log("Document successfully updated!"); }) 
 .catch((error) => {console.error("Error updating document: ", error); });}

  return (

    <View>
      <Text style ={styles.title}>Your Profile</Text>
      <Text style  ={styles.text1}>{name.email}</Text>
      
      <Input
      placeholder="Enter New Email"
      onChangeText={setEmail}
      value={email}
      />

      <Text style  ={styles.text1}>{name.description}</Text>

      <Input
      placeholder="Enter new description"
      onChangeText={setDescription}
      value={description}
      />
      
      <Text style  ={styles.text1}>{name.address}</Text>

      <Input
      placeholder="Enter new address"
      onChangeText={setAddress}
      value={address}
      />
      
      <Text style  ={styles.text1}>{name.city}</Text>

      <Input
      placeholder="Enter new city"
      onChangeText={setCity}
      value={city}
      />
      
      <Text style  ={styles.text1}>{name.state}</Text>

      <Input
      placeholder="Enter new state"
      onChangeText={setState}
      value={state}
      />
      
      <Text style  ={styles.text1}>{name.phone}</Text>

      <Input
      placeholder="Enter new phone number"
      onChangeText={setPhone}
      value={phone}
      />
      
      <Text style  ={styles.text1}>{name.zip}</Text>

      <Input
      placeholder="Enter new zip number"
      onChangeText={setZip}
      value={zip}
      />
      
      <Text style  ={styles.text1}>{name.size}</Text>

      <Input
      placeholder="Enter new size"
      onChangeText={setSize}
      value={size}
      />

      <Button 
        title="Save" 
        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
        titleStyle={{ fontWeight: 'bold', fontSize: 25 }} 
        //icon={{name: 'sign-in',type: 'font-awesome',size: 20,color: 'white',}}
        onPress={save} 
        style={{ padding: 10, marginVertical: 5, width: 370 }} />

      

      
    </View>
  )
}

export default CommunityProfileScreen

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

