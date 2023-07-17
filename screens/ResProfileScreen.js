import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Input } from "@rneui/themed";
import { collection, getDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';

const ResProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({})
  const [name, setName] = useState()
  const [birthDate, setBirth] = useState()
  const [communityName, setCommunityName] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()

  const fetchData = async () => {
   const docRef = doc(db, "users", "iT6vZgRsAbS3VjuBUZNZ");
    const docSnap  = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser(docSnap.data());
      setBirth(docSnap.data().birthDate.toDate().toLocaleDateString([], {  year: 'numeric', month: 'long', day: 'numeric' }))
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

  };

  useEffect(() => {
    fetchData()
  }, [])

  const save = async () => {
    try {
      const docRef = await updateDoc(collection(db, "users"), {
        name: name,
        birthDate: birthDate,
        phone: phone,
        email: email
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (

    <View>

      <Input
        placeholder={user.name}
        onChangeText={setName}
        value={name}
      />

      <Input
        placeholder= {user.communityName}
        value={communityName}
      />

      <Input
        placeholder={birthDate}
        onChangeText={setBirth}
        value={birthDate}
      />

      <Input
        placeholder={user.phone}
        onChangeText={setPhone}
        value={phone}
      />

      <Input
        placeholder={user.email}
        onChangeText={setEmail}
        value={email}
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

export default ResProfileScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 2,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center'
  }
})
