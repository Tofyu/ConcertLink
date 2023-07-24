import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDoc, doc, getDocs, query, update } from "firebase/firestore"; 
import { db } from '../firebase';

const EventDetailsScreen = ({ navigation, route }) => {
  const [event, setEvent] = useState({});
  const [songs, setSongs] = useState([]);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const { eventID } = route.params;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(event);
  }, [event]);

  useEffect(() => {
    console.log(songs);
  }, [songs]);

  const fetchData = async () => {
    const eventFromDB = await getDoc(doc(db, "events", eventID));
    setEvent({ ...eventFromDB.data(), id: eventID });

    let songsFromDB = [];
    const querySnapshot = await getDocs(query(collection(db, "events", eventID, "songs")));
    querySnapshot.forEach((doc) => {
      songsFromDB.push({ ...doc.data(), id: doc.id });
    });
    setSongs(songsFromDB);
    
    setDate(eventFromDB.data().dateTime.toDate().toDateString() + " at " + eventFromDB.data().dateTime.toDate().toLocaleTimeString());
  };

  const renderItem = ({ item }) => (
    <View style={styles.songItem}>
      <Text style={styles.songName}>Song: {item.name}</Text>
    </View>
  );

  const submit = async () => {
    await db.collection('events').doc(eventID).update({ "notes": event.notes + '\n' + message });
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Event Details</Text>
      <Text style={styles.label}>Name: {event.communityName}</Text>
      <Text style={styles.label}>Date & Time: {date}</Text>
      <Text style={styles.label}>Status: {event.status}</Text>
      <FlatList data={songs} renderItem={renderItem} />
      <TextInput
        style={styles.input}
        placeholder='Message'
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={submit} />
    </View>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  songItem: {
    marginBottom: 8,
  },
  songName: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});
