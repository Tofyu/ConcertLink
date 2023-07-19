import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, query, where, getFirestore, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase'

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
            <View style = {{flexDirection:'row'}}>
                <Text style = {{margin: 10}}>{item.dateTime.toDate().toDateString()}</Text>
                <TouchableOpacity onPress = {() => {accept(item)}} style = {{margin: 10}}>
                    <Text>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {decline(item)}} style = {{margin: 10}}>
                    <Text>Decline</Text>
                </TouchableOpacity>
            </View>
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
        <View>
            <Text>Event Requests</Text>
            <FlatList data = {requests.filter((item) => item.status == "requested")} renderItem = {renderItem} />
            <View style = {{flexDirection: 'row'}}>
                <Text>Event List</Text>
                <SelectList setSelected = {(val) => {setSelected(val)}} data = {options} save = "value" />
            </View>
            <FlatList data = {requests.filter((item) => item.status == selected)} renderItem = {renderItem} />
        </View>
    )
}

export default EventRequestsScreen

const styles = StyleSheet.create({})
