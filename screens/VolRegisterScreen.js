import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../firebase';

const VolRegisterScreen = () => {
    const [name, setName] = useState('')
    const [school, setSchool]= useState('')
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
        const docsData = querySnapshot.docs.map((doc) => ({label: doc.data().name, value: doc.id}));
        setGroups(docsData);
      };
    
    useEffect(()=>{
      fetchData()
    }, [])
    
 
    const signUp = async ()=>{
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
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    
      return (
        <View style={styles.container}>
          <TextInput placeholder='Name' onChangeText={name => setName(name)} />
          <TextInput placeholder='Phone' onChangeText={phone => setPhone(phone)} />
          <TextInput placeholder='School' onChangeText={school => setSchool(school)} />
          <TextInput placeholder='Grade' onChangeText={grade => setGrade(grade)} />
          <TextInput placeholder='Instrument' onChangeText={instrument => setInstrument(instrument)} />
          <DropDownPicker
                open={open}
                value={volGroup}
                items={groups}
                setOpen={setOpen}
                setValue={setVolGroup}
                // setItems={setItems}
                theme="DARK"
                multiple={false}
                mode="BADGE"
                badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
              />          <TextInput placeholder='Email' onChangeText={email => setEmail(email)} />
          <TextInput placeholder='Password' onChangeText={password => setPassword(password)} />

          <Button title="Sign Up" onPress={signUp} />
    
        </View>
      );
}

export default VolRegisterScreen

const styles = StyleSheet.create({})