import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, doc, updateDoc, getDoc, where } from "firebase/firestore";
import { db, auth } from '../firebase'
import { Avatar, Card, IconButton, Button, Chip, Text, PaperProvider, Divider,Badge, Appbar } from 'react-native-paper';

const EventRequestsScreen = ({navigation}) => {
    const [requests, setRequests] = useState([])
    const [selected, setSelected] = useState("")
    const options = [{key:'1', value:'accepted'}, {key:'2', value:'declined'}]
    const user = auth.currentUser;

    const getVolunteerGroupID = async () => {
        console.log("User ID:::::", user.uid)
        const docRef = doc(db, 'volunteers', user.uid);
        const docSnap = await getDoc(docRef);
        let groupID = '';
    
        if (docSnap.exists()) {
          groupID = docSnap.data().volunteerGroupID;
        } else {
          console.log('No such document!');
        }

        return groupID;
    };

    // Define a function to fetch the community document
const fetchCommunityDocument = async (communityID) => {
    try {
      // Fetch the community document
      const communityDocRef = doc(db, 'communities', communityID);
      const communityDocSnap = await getDoc(communityDocRef);
  
      if (communityDocSnap.exists()) {
        // Return the community document data
        return communityDocSnap.data();
      } else {
        console.log("Community document does not exist!");
        return null; // Return null if the document doesn't exist
      }
    } catch (error) {
      console.error('Error fetching community document:', error);
      return null; // Return null if there's an error
    }
  };

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(requests)
        
    }, [requests])

    useEffect(() => {
        console.log(selected)
    }, [selected])

    const fetchData = async() => {
        let requestsFromDB = []
        const groupID = await getVolunteerGroupID();
        console.log("Group ID:::::::::", groupID)
        const eventsQuery = query(collection(db, 'events'), where('volunteerGroupID', '==', groupID));
        const querySnapshot = await getDocs(eventsQuery);
        querySnapshot.forEach((doc) => {
            requestsFromDB.push({...doc.data(), id:doc.id, showDetail:false});
        });
        setRequests(requestsFromDB)
    }

    const renderItem = ({item}) => (
       
            <Card style={styles.customCardStyle}>
  <Card.Title 
    title={item.communityName} 
    subtitle={item.dateTime.toDate().toDateString()} 
    left={(props) => <Avatar.Icon {...props} icon="folder" />} 
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={async() => {
        const communityData = await fetchCommunityDocument(item.communityID);
        
        if (communityData !== null) {
          // Handle the communityData as needed
          console.log("Community Data::::::", communityData);
          item.showDetail = !item.showDetail;
          item.communityData = communityData
          const updatedList = [...requests]
          setRequests(updatedList)
        }
      }} />}
  />
  <Card.Actions>
    <Button onPress={() => { accept(item) }}>Accept</Button>
    <Button onPress={() => { decline(item) }}>Decline</Button>
  </Card.Actions>
  {item.showDetail && (
        <Card.Content>
          <Text variant="bodyMedium">Name:{item.communityData.name}</Text>
          <Text variant="bodyMedium">Address:{item.communityData.address} {item.communityData.city} {item.communityData.state}</Text>
          <Text variant="bodyMedium">Size:{item.communityData.size}</Text>
          <Text variant="bodyMedium">Phone:{item.communityData.phone}</Text>
        
        </Card.Content>
      )
      }
</Card>
    )

    const renderPast = ({item}) => (
        <Card style={styles.customCardStyle}>
            <Card.Title 
                title = {item.communityName + ": " + item.status} 
                subtitle = {item.dateTime.toDate().toDateString()} 
                left={(props) => <Avatar.Icon {...props} icon="folder" />} 
                right={(props) => <IconButton {...props} icon="dots-vertical" onPress={async() => {
                    const communityData = await fetchCommunityDocument(item.communityID);
                    
                    if (communityData !== null) {
                      // Handle the communityData as needed
                      console.log("Community Data::::::", communityData);
                      item.showDetail = !item.showDetail;
                      item.communityData = communityData
                      const updatedList = [...requests]
                      setRequests(updatedList)
                    }
                  }} />}
              />
       {item.showDetail && (
        <Card.Content>
          <Text variant="bodyMedium">Name:{item.communityData.name}</Text>
          <Text variant="bodyMedium">Address:{item.communityData.address} {item.communityData.city} {item.communityData.state}</Text>
          <Text variant="bodyMedium">Size:{item.communityData.size}</Text>
          <Text variant="bodyMedium">Phone:{item.communityData.phone}</Text>
        
        </Card.Content>
      )
      }
</Card>
    )

    const accept = async(item) => {
        updateDoc(doc(db, "events", item.id), {status:"accepted"}).then(item => {console.log(item)}).catch(error => {console.log(error)})
        fetchData()
    }

    const decline = async(item) => {
        updateDoc(doc(db, "events", item.id), {status:"declined"}).then(item => {console.log(item)}).catch(error => {console.log(error)})
        fetchData()
    }

    return (
        <SafeAreaView>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
      <IconButton icon="account-edit" size={20} onPress={() => {navigation.navigate("Group Update")}} />
    </View>
            <View style = {{paddingTop:20, paddingHorizontal:15}}>
            <Divider />
            <View style={{ flexDirection: 'row', marginTop:15}}>
                <Text variant="titleMedium" style={{ padding: 5 }}>
                  New Request
                </Text>
                <View style={{ position: 'absolute', right: 50, top: -2 }}>
                    <Badge style={{
                    width: 12,  // Adjust the width as needed
                    }}>
                    {requests.filter((item) => item.status == "requested").length}
                    </Badge>
                </View>
              </View>
                
                <FlatList data = {requests.filter((item) => item.status == "requested")} renderItem = {renderItem} />
                {/* to do: option to filter
                 <View style = {{flexDirection: 'row'}}>
                    <Text>Event List</Text>
                    <SelectList setSelected = {(val) => {setSelected(val)}} data = {options} save = "value" />
                </View>

                <Chip icon = "information" onPress={() => console.log('accepted press')}>Accepted</Chip>
                <Chip icon = "information" onPress={() => console.log('declined press')}>Declined</Chip> */}
                <Divider style={{margin:20}}/>
                <View style={{ flexDirection: 'row', marginTop:15}}>
                <Text variant="titleMedium" style={{ padding: 5 }}>
                  All Events
                </Text>
                <View style={{ position: 'absolute', right: 50, top: -2 }}>
                    <Badge style={{
                    width: 12,  // Adjust the width as needed
                    }}>
                    {requests.filter((item) => item.status !== "requested").length}
                    </Badge>
                </View>
              </View>
                <FlatList data = {requests.filter((item) => item.status != "requested")} renderItem = {renderPast} />
            </View>
        </SafeAreaView>
    )
}

export default EventRequestsScreen

const styles = StyleSheet.create({
    customCardStyle:{
        backgroundColor: "#F5F5F5",// Change the background color to your desired color
        borderRadius: 10, // Adjust the border radius for rounded corners
        elevation: 5, // Add elevation (shadow) to the card
        margin: 10, // Add margin to create spacing around the card
      }
})