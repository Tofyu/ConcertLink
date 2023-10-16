import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { collection, getDoc, updateDoc, doc, getDocs } from "firebase/firestore";
import { db, auth } from '../firebase';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package

const VolProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({})
  const [name, setName] = useState()
  const [grade, setGrade] = useState()
  const [school, setSchool] = useState()
  const [instrument, setInstrument] = useState()
  const [groupName, setGroupName] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState()
  const userid = auth.currentUser;

  useEffect(() => {
    //get volunteer group list for picker
    const fetchGroups = async () => {
      console.log("Fetch data")
      const querySnapshot = await getDocs(collection(db, "volunteerGroups"));
      const groupList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(groupList);
      console.log(groupList)
    };

    //Read user information
    const fetchUserData = async () => {
      const docRef = doc(db, "volunteers", userid.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const user = docSnap.data()
        setUser(user);
        setName(user.name)
        setEmail(user.email || 'Enter Email')
        setGrade(user.grade || 'Enter grade')
        setInstrument(user.instrument || 'Enter instrument')
        setPhone(user.phone || 'Enter phone')
        setSelectedGroup[docSnap.data().volunteerGroupID]
      } else {
        console.log("No such document!");
      }
    };

    fetchGroups();
    fetchUserData();

  }, []);

  const save = async () => {
    const userRef = doc(db, "volunteers", userid.uid);

    try {
      const docRef = await updateDoc(userRef, {
        name: name || "",
        grade: grade || "",
        phone: phone || "",
        instrument: instrument || "",
        school: school || "",
        email: email || "",
        volunteerGroupID: selectedGroup.ID || "",
        groupName: selectedGroup.name || ""
      });
      console.log("Profile changed")
      navigation.navigate("Volunteer Events")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const deleteAccount = async () => {
    // Show an alert to confirm account deletion
    Alert.alert(
      'Confirm Account Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            // Delete the user's account in Firebase Authentication
            try {
              await auth.currentUser.delete();
              console.log('User account deleted successfully.');
              // Navigate to the login screen or any other appropriate screen after deletion
              navigation.navigate('Login'); // Change 'Login' to the desired screen
            } catch (error) {
              console.error('Error deleting user account:', error.message);
              // Handle the error, display an error message, or provide user feedback
            }
          },
          style: 'destructive', // The button is styled to indicate a destructive action
        },
      ],
      { cancelable: true } // Allow the user to tap outside the alert to dismiss it
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Volunteer Profile</Text>

      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder={user.grade}
        onChangeText={setGrade}
        value={grade}
      />

      <TextInput
        style={styles.input}
        placeholder={user.school}
        onChangeText={setSchool}
        value={school}
      />

      <TextInput
        style={styles.input}
        placeholder={user.instrument}
        onChangeText={setInstrument}
        value={instrument}
      />

      <TextInput
        style={styles.input}
        placeholder={user.phone}
        onChangeText={setPhone}
        value={phone}
      />
      


      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <Picker
        selectedValue={selectedGroup ? selectedGroup.id : ''}
        onValueChange={(itemValue, itemIndex) => {
          const selectedGroupObject = groups.find((group) => group.id === itemValue);
          setSelectedGroup(selectedGroupObject);
        }}
      >
        <Picker.Item label="Select a group" value="" />
        {groups.map((group) => (
          <Picker.Item key={group.id} label={group.name} value={group.id} />
        ))}
      </Picker>
      <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <Button onPress={save} mode="elevated"> Save </Button>
        <Button onPress={deleteAccount} mode="contained">

          Delete Account
        </Button>
      </View>


    </SafeAreaView>
  )
}

export default VolProfileScreen

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
