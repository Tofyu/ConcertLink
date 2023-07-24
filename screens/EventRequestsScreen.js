import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, getFirestore, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const EventRequestsScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState("");
  const options = [{ key: '1', value: 'accepted' }, { key: '2', value: 'declined' }];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const fetchData = async () => {
    let requestsFromDB = [];

    const querySnapshot = await getDocs(query(collection(db, "events")));
    querySnapshot.forEach((doc) => {
      requestsFromDB.push({ ...doc.data(), id: doc.id });
    });
    setRequests(requestsFromDB);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Event Details', { eventID: item.id })} style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.dateTime.toDate().toDateString()} - {item.communityName}
      </Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => { accept(item) }} style={[styles.actionButton, styles.acceptButton]}>
          <Text style={styles.actionButtonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { decline(item) }} style={[styles.actionButton, styles.declineButton]}>
          <Text style={styles.actionButtonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const accept = async (item) => {
    updateDoc(doc(db, "events", item.id), { status: "accepted" })
      .then(item => { console.log(item) })
      .catch(error => { console.log(error) });
    fetchData();
  };

  const decline = async (item) => {
    updateDoc(doc(db, "events", item.id), { status: "declined" })
      .then(item => { console.log(item) })
      .catch(error => { console.log(error) });
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Event Requests</Text>

      {/* Icon buttons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Group Update')}>
          <MaterialCommunityIcons name="account-multiple" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Group Register')}>
          <MaterialCommunityIcons name="account-multiple-plus" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList data={requests.filter((item) => item.status == "requested")} renderItem={renderItem} />
      <View style={styles.eventListContainer}>
        <Text style={styles.eventListText}>Event List</Text>
        <SelectList setSelected={(val) => { setSelected(val) }} data={options} save="value" />
      </View>
      <FlatList data={requests.filter((item) => item.status == selected)} renderItem={renderItem} />
    </View>
  );
}

export default EventRequestsScreen;

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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  declineButton: {
    backgroundColor: 'red',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  eventListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  eventListText: {
    fontSize: 16,
    marginRight: 8,
  },
});
