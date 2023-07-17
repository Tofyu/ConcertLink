import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResRegisterScreen from './screens/ResRegisterScreen';
import VolRegisterScreen from './screens/VolRegisterScreen';
import VolProfileScreen from './screens/VolProfileScreen';
import ResFeedbackScreen from './screens/ResFeedbackScreen'
import ResProfileScreen from './screens/ResProfileScreen'
import CommunityEventsScreen from './screens/CommunityEventsScreen'
import VolFeedbackScreen from './screens/VolFeedbackScreen'


const App = () => {

  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Volunteer Feedback" component={VolFeedbackScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Community Events" component={CommunityEventsScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Resident Feedback" component={ResFeedbackScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Resident Profile" component={ResProfileScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Volunteer Profile" component={VolProfileScreen} options={{headerShown:false}}/>

      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Resident Register" component={ResRegisterScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Volunteer Register" component={VolRegisterScreen} options={{headerShown:false}}/>
      
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})