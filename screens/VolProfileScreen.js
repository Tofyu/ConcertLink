import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Input } from "@rneui/themed";
import { collection, getDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';

const VolProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({})
  const [name, setName] = useState()
  const [grade, setGrade] = useState()
  const [school, setSchool] = useState()
  const [instrument, setInstrument] = useState()
  const [volunteerGroup, setGroup] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()
  const userid = auth.currentUser;

  const fetchData = async () => {
    const docRef = doc(db, "volunteers", userid.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser(docSnap.data());
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const save = async () => {
    try {
      // Create an object to hold the fields you want to update
      const updatedData = {};
  
      // Check if each field has a valid value and include it in the update
      if (name) updatedData.name = name;
      if (grade) updatedData.grade = grade;
      if (school) updatedData.school = school;
      if (instrument) updatedData.instrument = instrument;
      if (phone) updatedData.phone = phone;
      if (email) updatedData.email = email;
  
      console.log("########################", userid.uid)
      // Check if there are any fields to update
      if (Object.keys(updatedData).length > 0) {
        const docRef = await updateDoc(doc(db, "volunteers", userid.uid), updatedData);
        //console.log("Document updated with ID: ", docRef.id);
        navigation.navigate("Volunteer Events");
  
        
      } else {
        console.log("No fields to update.");
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Volunteer Profile</Text>

      <Text style = {styles.text}> Name </Text>
      <Input
        style={styles.input}
        placeholder={user.name}
        onChangeText={setName}
        value={name}
      />
      <Text style = {styles.text}> Grade </Text>

      <Input
        style={styles.input}
        placeholder={user.grade}
        onChangeText={setGrade}
        value={grade}
      />
      <Text style = {styles.text}> School </Text>

      <Input
        style={styles.input}
        placeholder={user.school}
        onChangeText={setSchool}
        value={school}
      />
      <Text style = {styles.text}> Instrument </Text>

      <Input
        style={styles.input}
        placeholder={user.instrument}
        onChangeText={setInstrument}
        value={instrument}
      />
      <Text style = {styles.text}> Volunteer Group </Text>

      <Input
        style={styles.input}
        placeholder={user.volunteerGroup}
        value={volunteerGroup}
      />
      <Text style = {styles.text}> Phone </Text>

      <Input
        style={styles.input}
        placeholder={user.phone}
        onChangeText={setPhone}
        value={phone}
      />
      <Text style = {styles.text}> Email </Text>

      <Input
        style={styles.input}
        placeholder={user.email}
        onChangeText={setEmail}
        value={email}
      />

      <Button
        title="Save"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={save}
      />
    </SafeAreaView>
    </ScrollView>
  )
}

export default VolProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical:20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 2,
    paddingTop: 15,
    paddingBottom: 15
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 2,
    paddingTop: 15,
    paddingBottom: 15
  },
  input: {
    height: 40,
    width: 300,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#27D5F5',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
});