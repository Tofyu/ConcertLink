import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDoc, doc, getDocs, query, update } from "firebase/firestore"; 
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { db } from '../firebase'

const EventDetailsScreen = ( { navigation, route } ) => {
    const [event, setEvent] = useState({})
    const [songs, setSongs] = useState([])
    const [date, setDate] = useState('')
    const [message, setMessage] = useState('')
    const { eventID } = route.params;

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(event)
    }, [event])

    useEffect(() => {
        console.log(songs)
    }, [songs])

    const fetchData = async () => {
        const eventFromDB = await getDoc(doc(db, "events", eventID))
        setEvent({...eventFromDB.data(), id:eventID})

        let songsFromDB = []
        const querySnapshot = await getDocs(query(collection(db, "events", eventID, "songs")))
        querySnapshot.forEach((doc) => {
            songsFromDB.push({...doc.data(), id:doc.id})
        })
        setSongs(songsFromDB)
        
        setDate(eventFromDB.data().dateTime.toDate().toDateString() + " at " + eventFromDB.data().dateTime.toDate().toLocaleTimeString())
    }

    const renderItem = ({item}) => (
        <Card>
            <Card.Title title = {"Song: " + item.name} />
        </Card>
    )

    const submit = async () => {
        await db.collection('events').doc(eventID).update({"notes":event.notes + '\n' + message})
        fetchData;
    }

    return (
        <SafeAreaView>
            <Text variant = "headlineSmall">Event Details</Text>
            <Text variant = "headlineSmall">name: {event.communityName}</Text>
            <Text variant = "headlineSmall">dateTime: {date}</Text>
            <Text variant = "headlineSmall">status: {event.status}</Text>
            <FlatList data = {songs} renderItem = {renderItem}/>
            <TextInput placeholder = 'Message' onChangeText = {setMessage} />
            <Button mode = 'elevated' onPress = {submit}>Send</Button>
        </SafeAreaView>
    )
}

export default EventDetailsScreen

const styles = StyleSheet.create({})