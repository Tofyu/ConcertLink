import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View,  Button, FlatList } from 'react-native';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from './firebase';

export default function App() {
const [name, setName] = useState('')
const [description, setDescription]= useState('')
const [city, setCity] = useState('')
const [communities, setCommunities] = useState([])

const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, 'communities'));
  const docsData = querySnapshot.docs.map((doc) => doc.data());
  setCommunities(docsData);
};

useEffect(()=>{
  fetchData()
}, [])

const renderItem = ({item}) =>(
  <Text>{item.name}</Text>
)
const Submit = async ()=>{
  try {
    const docRef = await addDoc(collection(db, "communities"), {
      name: name,
      description: description,
      city: city
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

  return (
    <View style={styles.container}>
      <TextInput placeholder='Name' onChangeText={name => setName(name)} />
      <TextInput placeholder='Description' onChangeText={desc => setDescription(desc)} />
      <TextInput placeholder='City' onChangeText={city => setCity(city)} />
      <Button title="Add" onPress={Submit} />
      <FlatList data = {communities} renderItem={renderItem} />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});