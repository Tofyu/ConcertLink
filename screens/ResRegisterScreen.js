import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const ResRegisterScreen = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [password, setPassword] = useState('')
  const [communities, setCommunities] = useState([])
  const [open, setOpen] = useState(false);
  const [community, setCommunity] = useState();

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'communities'));
    const docsData = querySnapshot.docs.map((doc) => ({ label: doc.data().name, value: doc.id }));
    setCommunities(docsData);
  };

  useEffect(() => {
    console.log(communities)

  }, [communities])
  useEffect(() => {
    fetchData()
  }, [])


  const signUp = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        phone: phone,
        email: email,
        birthDate: birthDate,
        password: password,
        communityName: communities.find(item => item.value == community).label, 
        communityID: community       
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder='Name' onChangeText={name => setName(name)} />
      <TextInput placeholder='Phone' onChangeText={phone => setPhone(phone)} />
      <TextInput placeholder='Birthday' onChangeText={birthDate => setBirthDate(birthDate)} />
      <Text> Community</Text>
      <DropDownPicker
        open={open}
        value={community}
        items={communities}
        setOpen={setOpen}
        setValue={setCommunity}
        // setItems={setItems}  
        theme="DARK"
        multiple={false}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
      />
      <TextInput placeholder='Email' onChangeText={email => setEmail(email)} />
      <TextInput placeholder='Password' onChangeText={password => setPassword(password)} />

      <Button title="Sign Up" onPress={signUp} />

    </View>
  );
}

export default ResRegisterScreen

const styles = StyleSheet.create({})