import { StyleSheet, Button, TextInput, View, FlatList, SafeAreaView} from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, doc } from "firebase/firestore";
import { db, auth } from '../firebase';
import {Text, Divider} from 'react-native-paper'

const VolFeedbackScreen = ( {navigation, route} ) => {
    const [feedbacks, setFeedbacks] = useState([])
    const { eventID } = route.params;    
   

    const fetchData = async () => {
      let feedbacksFromDB = [];
      const querySnapshot = await getDocs(collection(db, 'events', eventID, "feedback"));
      const docsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("+++++++++++++++++++++++++++++++++++", docsData);
    
      for (const docSnap of docsData) {
        if (!docSnap.empty) {    
          feedbacksFromDB.push({ id: docSnap.id, ...docSnap });
          console.log("Document:", docSnap);
        } else {
          console.log("No such document!");
        }
      }  
    
        setFeedbacks(feedbacksFromDB);
    }  
    
        useEffect(()=>{
            fetchData();
            
          }, [])


      const renderItem = ({ item }) => (
        
        <View style={styles.item}>
          <Text style={styles.label}>{item.userID}</Text>
          <Text style={styles.subLabel}>{item.comments}</Text>
        </View>
      );

      const renderEmptyComponent = () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginTop:20 }}>
          <Text>No feedback posted</Text>
        </View>
      );
      
    return (
      
      <SafeAreaView style={styles.container}>
         <Text variant="titleMedium" style={{ fontWeight: "bold" }}>Event Feedback</Text>
         <Divider/>
      <FlatList 
        data={feedbacks}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
      
    )

};

export default VolFeedbackScreen

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
  }

})