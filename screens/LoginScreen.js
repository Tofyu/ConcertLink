import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ImageBackground  } from "react-native";
import { Button, Input } from "@rneui/themed";
import { auth, db } from "../firebase";

const LoginScreen = ({ navigation }) => {
  

  return (
    <View>
      <View>
        <Button 
        title="Login" 
        onPress={() => navigation.navigate("User BottomTab")} />

        <Button 
        title="Create Account" 
        onPress={() => navigation.navigate("Volunteer Register")} />
      </View>
    </View>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({})