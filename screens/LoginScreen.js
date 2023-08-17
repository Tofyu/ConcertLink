import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ImageBackground  } from "react-native";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TextInput, Button } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  //Login function
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigation.navigate("User BottomTab")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
  return (
    
    <View style={{marginTop:230}}> 
      <TextInput
        placeholder="Enter your email"
        leftIcon={{ type: "material", name: "email" }}
        styles={styles}
        label="Email"
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Enter your password"
        leftIcon={{ type: "material", name: "lock" }}
        style={styles}
        label="Password"
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={{alignItems:'center'}}>
        <Button onPress={login} > Login </Button>
        

        <Button onPress={() => navigation.navigate("Register")} > Create Account </Button>
        
      </View>
    </View>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({})
