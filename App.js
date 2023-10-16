import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './screens/LoginScreen';
import VolRegisterScreen from './screens/VolRegisterScreen';
import VolProfileScreen from './screens/VolProfileScreen';
import VolunteerEventsScreen from './screens/VolunteerEventsScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import EventRequestsScreen from './screens/EventRequestsScreen';
import GroupRegisterScreen from './screens/GroupRegisterScreen';
import GroupUpdateScreen from './screens/GroupUpdateScreen';
import VolFeedbackScreen from './screens/VolFeedbackScreen';
import VolEventDetailsScreen from './screens/VolEventDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const EventsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Volunteer Events" component={VolunteerEventsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Volunteer Event Details" component={VolEventDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Volunteer Feedback" component={VolFeedbackScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Group Register" component={GroupRegisterScreen} options={{ headerShown: false }} />
   
    </Stack.Navigator>
  );
};

const ManagerStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Event Requests" component={EventRequestsScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Event Details" component={EventDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Group Update" component={GroupUpdateScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const BottomTab = () =>{
  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator>
        <Tab.Screen name="Events" component={EventsStack} options={{
          headerShown: false,
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-check" color={color} size={size} />
          ),
        }}
        />
        <Tab.Screen name="Volunteer Profile" component={VolProfileScreen} options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        />
        <Tab.Screen name="Manager" component={ManagerStack} options={{
          headerShown: false,
          tabBarLabel: 'Manager Page',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-tie" color={color} size={size} />
          ),
        }}
        />
      </Tab.Navigator>
  )
}


const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Register" component={VolRegisterScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="User BottomTab" component={BottomTab} options={{headerShown:false}}/>
  </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});