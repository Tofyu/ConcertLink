import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const VolRegisterScreen = ( {navigation} ) => {
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [grade, setGrade] = useState('')
  const [instrument, setInstrument] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [groups, setGroups] = useState([])
  const [open, setOpen] = useState(false);
  const [volGroup, setVolGroup] = useState();

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'volunteerGroups'));
    const docsData = querySnapshot.docs.map((doc) => ({ label: doc.data().name, value: doc.id }));
    setGroups(docsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const signUp = async () => {
    try {
      const docRef = await addDoc(collection(db, "volunteers"), {
        name: name,
        phone: phone,
        email: email,
        grade: grade,
        school: school,
        instrument: instrument,
        volunteerGroupName: groups.find(item => item.value == volGroup).label,
        volunteerGroupID: volGroup,
        password: password,
      });

      navigation.navigate("Login");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <View style={styles.container}>
            <Text style={styles.title}>Volunteer Registration</Text>
      <TextInput style={styles.input} placeholder='Name' onChangeText={name => setName(name)} />
      <TextInput style={styles.input} placeholder='Phone' onChangeText={phone => setPhone(phone)} />
      <TextInput style={styles.input} placeholder='School' onChangeText={school => setSchool(school)} />
      <TextInput style={styles.input} placeholder='Grade' onChangeText={grade => setGrade(grade)} />
      <TextInput style={styles.input} placeholder='Instrument' onChangeText={instrument => setInstrument(instrument)} />
      <DropDownPicker
        open={open}
        value={volGroup}
        items={groups}
        setOpen={setOpen}
        setValue={setVolGroup}
        theme="LIGHT"
        multiple={false}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        itemStyle={styles.dropdownItem}
        labelStyle={styles.dropdownLabel}
        placeholder="Volunteer Group"
      />
      <TextInput style={styles.input} placeholder='Email' onChangeText={email => setEmail(email)} />
      <TextInput style={styles.input} placeholder='Password' onChangeText={password => setPassword(password)} />

      <Button title="Sign Up" onPress={signUp} />

    </View>
  );
}

export default VolRegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#000',
  },
});
