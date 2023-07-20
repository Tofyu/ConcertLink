import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDoc, doc, getDocs, query, update } from "firebase/firestore"; 
import { db } from '../firebase'

const EventDetailsScreen = () => {
    const [event, setEvent] = useState({})
    const [songs, setSongs] = useState([])
    const [date, setDate] = useState('')
    const [message, setMessage] = useState('')

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
        const eventFromDB = await getDoc(doc(db, "events", "Mbbf7dXcSbvtFCtokqjl"))
        setEvent({...eventFromDB.data(), id:"Mbbf7dXcSbvtFCtokqjl"})

        let songsFromDB = []
        const querySnapshot = await getDocs(query(collection(db, "events", "Mbbf7dXcSbvtFCtokqjl", "songs")))
        querySnapshot.forEach((doc) => {
            songsFromDB.push({...doc.data(), id:doc.id})
        })
        setSongs(songsFromDB)
        
        setDate(eventFromDB.data().dateTime.toDate().toDateString() + " at " + eventFromDB.data().dateTime.toDate().toLocaleTimeString())
    }

    const renderItem = ({item}) => (
        <View>
            <Text>song: {item.name}</Text>
        </View>
    )

    const submit = async () => {
        await db.collection('events').doc("Mbbf7dXcSbvtFCtokqjl").update({"notes":event.notes + '\n' + message})
        fetchData;
    }

    return (
        <View>
            <Text>Event Details</Text>
            <Text>name: {event.communityName}</Text>
            <Text>dateTime: {date}</Text>
            <Text>status: {event.status}</Text>
            <FlatList data = {songs} renderItem = {renderItem}/>
            <TextInput placeholder = 'Message' onChangeText = {setMessage} />
            <Button title = "Send" onPress = {submit} />
        </View>
    )
}

export default EventDetailsScreen

const styles = StyleSheet.create({})
