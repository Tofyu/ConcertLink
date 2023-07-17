import React, {} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const RegisterScreen = ({ navigation }) => {

  return (
    
      <View style={{alignItems:'center'}}>

        <TouchableOpacity  onPress={() => navigation.navigate("Volunteer Register")}>
            <Image source={require('assets\volunteericon.png')} />
        </TouchableOpacity>
        <Text> Volunteer </Text>


        <TouchableOpacity  onPress={() => navigation.navigate("Resident Register")}>
            <Image source={require('assets\icon.png')} />
        </TouchableOpacity>
        <Text> Resident </Text>
      </View>
    
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})