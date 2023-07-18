import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const ResRegisterScreen = ( {navigation} ) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [communities, setCommunities] = useState([]);
  const [open, setOpen] = useState(false);
  const [community, setCommunity] = useState('');

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'communities'));
    const docsData = querySnapshot.docs.map((doc) => ({ label: doc.data().name, value: doc.id }));
    setCommunities(docsData);
  };

  useEffect(() => {
    console.log(communities);
  }, [communities]);

  useEffect(() => {
    fetchData();
  }, []);

  const signUp = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        phone: phone,
        email: email,
        birthDate: birthDate,
        password: password,
        communityName: communities.find(item => item.value === community)?.label,
        communityID: community
      });

      navigation.navigate("Login")
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput style={styles.input} placeholder='Name' onChangeText={name => setName(name)} />
      <TextInput style={styles.input} placeholder='Phone' onChangeText={phone => setPhone(phone)} />
      <TextInput style={styles.input} placeholder='Birthday' onChangeText={birthDate => setBirthDate(birthDate)} />
      <TextInput style={styles.input} placeholder='Email' onChangeText={email => setEmail(email)} />
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          style={styles.dropdown}
          containerStyle={styles.dropdownInnerContainer}
          textStyle={styles.dropdownText}
          itemStyle={styles.dropdownItem}
          labelStyle={styles.dropdownLabel}
          placeholder="Select Community"
          open={open}
          value={community}
          items={communities}
          setOpen={setOpen}
          setValue={setCommunity}
          theme="LIGHT"
          multiple={false}
          mode="BADGE"
          badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
        />
      </View>
      <TextInput style={styles.input} placeholder='Password' onChangeText={password => setPassword(password)} />
      <Button title="Sign Up" onPress={signUp} />
    </View>
  );
};

export default ResRegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownInnerContainer: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});
