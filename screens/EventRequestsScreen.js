import { StyleSheet, View, FlatList } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase'
import { Avatar, Card, IconButton, Button, Chip, Text, PaperProvider } from 'react-native-paper';

const EventRequestsScreen = () => {
    const [requests, setRequests] = useState([])
    const [selected, setSelected] = useState("")
    const options = [{key:'1', value:'accepted'}, {key:'2', value:'declined'}]

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

        const querySnapshot = await getDocs(query(collection(db, "events")));
        querySnapshot.forEach((doc) => {
            requestsFromDB.push({...doc.data(), id:doc.id})
        });
        setRequests(requestsFromDB)
    }

    const renderItem = ({item}) => (
            // <View style = {{flexDirection:'row'}}>
            //     <Text style = {{margin: 10}}>{item.dateTime.toDate().toDateString()}</Text>
            //     <TouchableOpacity onPress = {() => {accept(item)}} style = {{margin: 10}}>
            //         <Text>Accept</Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity onPress = {() => {decline(item)}} style = {{margin: 10}}>
            //         <Text>Decline</Text>
            //     </TouchableOpacity>
            // </View>
            <Card>
                <Card.Title 
                    title = {item.communityName} 
                    subtitle = {item.dateTime.toDate().toDateString()} 
                    left={(props) => <Avatar.Icon {...props} icon="folder" />} 
                    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
                />
                <Card.Actions>
                    <Button onPress = {() => {accept(item)}} >Accept</Button>
                    <Button onPress = {() => {decline(item)}} >Decline</Button>
                </Card.Actions>
            </Card>
    )

    const renderPast = ({item}) => (
        <Card>
            <Card.Title 
                title = {item.communityName + ": " + item.status} 
                subtitle = {item.dateTime.toDate().toDateString()} 
                left={(props) => <Avatar.Icon {...props} icon="folder" />} 
                right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
            />
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
        <PaperProvider>
            <View style = {{paddingTop:35, paddingHorizontal:15}}>
                <Text variant="headlineMedium" style = {{padding:5}}>Event Requests</Text>
                <FlatList data = {requests.filter((item) => item.status == "requested")} renderItem = {renderItem} />
                {/* to do: option to filter
                 <View style = {{flexDirection: 'row'}}>
                    <Text>Event List</Text>
                    <SelectList setSelected = {(val) => {setSelected(val)}} data = {options} save = "value" />
                </View>

                <Chip icon = "information" onPress={() => console.log('accepted press')}>Accepted</Chip>
                <Chip icon = "information" onPress={() => console.log('declined press')}>Declined</Chip> */}
                <Text variant="headlineMedium" style = {{padding:5}}>Past Requests</Text>
                <FlatList data = {requests.filter((item) => item.status != "requested")} renderItem = {renderPast} />
            </View>
        </PaperProvider>
    )
}

export default EventRequestsScreen

const styles = StyleSheet.create({})
