import { StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { Text, Card, IconButton, Button } from 'react-native-paper'
import React, { useState, useEffect } from 'react'
import { db, addDoc } from '../firebase'
import DateTimePicker from '@react-native-community/datetimepicker';

const VolunteerAvailableDatesScreen = ({navigation, route}) => {
    const [date, setDate] = useState(new Date());
    const [dates, setDates] = useState([])
    const [showPicker, setShowPicker] = useState(false);

    const{groupID} = route.params



    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let datesFromDB = []

        const querySnapshot = await getDocs(query(collection(db, "volunteerGroups", groupID, "availabilities")));
        querySnapshot.forEach((doc) => {
            datesFromDB.push({...doc.data(), id:doc.id})
        });
        setDates(datesFromDB)
    }

    const remove = (id) => {
        deleteDoc(doc(db, "volunteerGroups", groupID, "availabilities", id))
        fetchData()
    }

    const addAvailableDate = async() => { 
        try{
        const docRefRating = await addDoc(collection(db, "volunteerGroups", groupID, "availabilities", id), {
            dateTime: date,
            isFilled:false
          });
          console.log("Added")
        } catch (e) {
            console.error("Error adding document: ", e);
          }
     }

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
      };

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
            <Text variant = "headlineMedium">Add Available Date</Text>
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="datetime"
                is24Hour={true}
                display="default"
                onChange={onDateChange}
            />

            <Button mode = 'elevated' onPress = {addAvailableDate} style = {{justifyContent: 'flex-end'}}>Add Available Date</Button>
   
            <Text variant = "headlineMedium">Dates</Text>
            <FlatList renderItem = {renderItem} data = {dates} />
        </SafeAreaView>
    )
}

export default VolunteerAvailableDatesScreen

const styles = StyleSheet.create({})