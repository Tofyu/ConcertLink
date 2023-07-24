import { StyleSheet, Button, Text, TextInput, View, FlatList, SafeAreaView} from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, doc } from "firebase/firestore";
import { db, auth } from '../firebase';

const VolunteerEventsScreen = ( {navigation} ) => {
    const [events, setEvents] = useState([])
    
    useEffect(()=>{
      fetchData();
      
    }, [])
  
    const Item = ({ name }) => (
      <View style={{ padding: 20 }}>
        <Text>{name}</Text>
      </View>
    );
    
    const SectionHeader = ({ dateTime }) => (
      <View style={{ backgroundColor: '#f2f2f2', padding: 10 }}>
        <Text>{dateTime}</Text>
      </View>
    );


    const fetchData = async () => {
      let eventsFromDB = [];
      const querySnapshot = await getDocs(collection(db, 'events'));
      const docsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("+++++++++++++++++++++++++++++++++++", docsData);
    
      for (const docSnap of docsData) {
        if (!docSnap.empty) {
          const songsCollectionRef = collection(db, 'events', docSnap.id, 'songs');
          const songsSnapshot = await getDocs(songsCollectionRef);
          const songsData = songsSnapshot.docs.map((songDoc) => songDoc.data());
    
          eventsFromDB.push({ id: docSnap.id, ...docSnap, songsData });
          console.log("Document:", docSnap);
        } else {
          console.log("No such document!");
        }
      }
    
      console.log("Events:", eventsFromDB);
        
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", eventsFromDB)

          // Todo: group by date
          // const groupedData = eventsFromDB.reduce((acc, cur) => {
          //   let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
          //   const dateTime = cur.dateTime.toDate().toLocaleString(undefined, options); // format to date only;
          //   const item = { id: cur.id, name: cur.volunteerGroupName, time: cur.dateTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), location: cur.communityName };
          //   const group = acc.find(group => group.dateTime === dateTime);
          //   if (!group) {
          //     acc.push({ dateTime, data: [item] });
          //   } else {
          //     group.data.push(item);
          //   }
          //   return acc;
          // }, []);

          // Sort by date
        const sortedData = eventsFromDB.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)); 

        console.log('3.2************', sortedData);
        setEvents(sortedData);
          
        console.log('4 useEffect end')
      };


      const renderItem = ({ item }) => (
        
        <View style={styles.item}>
          <Text style={styles.label}>{item.volunteerGroupName}</Text>
          <Text style={styles.subLabel}>Date:</Text>
          <Text style={styles.info}>{item.dateTime.toDate().toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
          <Text style={styles.subLabel}>Location:</Text>
          <Text style={styles.info}>{item.communityName}</Text>
          <Text style={styles.subLabel}>Songs:</Text>
          <View style={styles.songsContainer}>
        {item.songsData.map((song, index) => (
          song.isSelected && (
            <Text key={index} style={styles.songName}>{song.name}</Text>
          )
        ))}
      </View>
        <Button title="See feedback" onPress={() => navigation.navigate('Volunteer Feedback', {
            eventID: item.id
          })} />
        
        </View>
      );
      
    return (
      
      <View style={styles.container}>
      <FlatList 
        data={events}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
      
    )

  }

export default VolunteerEventsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  songsContainer: {
    marginTop: 5,
  },
  songName: {
    fontSize: 14,
    marginBottom: 3,
    color: '#333',
  },

})