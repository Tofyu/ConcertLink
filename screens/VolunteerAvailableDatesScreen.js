import { StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { Text, Card, IconButton } from 'react-native-paper'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'

const VolunteerAvailableDatesScreen = () => {
    const [dates, setDates] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let datesFromDB = []

        const querySnapshot = await getDocs(query(collection(db, "volunteerGroups", "nX4hpNsXtKEOFlIKeNOa", "availabilities")));
        querySnapshot.forEach((doc) => {
            datesFromDB.push({...doc.data(), id:doc.id})
        });
        setDates(datesFromDB)
    }

    const remove = (id) => {
        deleteDoc(doc(db, "volunteerGroups", "nX4hpNsXtKEOFlIKeNOa", "availabilities", id))
        fetchData()
    }

    const renderItem = ({item}) => (
        <Card>
            <Card.Title
                title = {item.dateTime.toDate().toDateString()}
                subtitle = {"Filled: " + item.filled}
                right = {(props) => <IconButton {...props} icon = "trash-can-outline" onPress = {remove(item.id)}/>}
            />
        </Card>
    )

    return (
        <SafeAreaView>
            <Text variant = "headlineMedium">Dates</Text>
            <FlatList renderItem = {renderItem} data = {dates} />
        </SafeAreaView>
    )
}

export default VolunteerAvailableDatesScreen

const styles = StyleSheet.create({})
