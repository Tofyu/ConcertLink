import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  //Test login: Vol@mail.com
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Login successful
        navigation.navigate('User BottomTab');
      })
      .catch(error => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your email"
        leftIcon={{ type: 'material', name: 'email' }}
        label="Email"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        placeholder="Enter your password"
        leftIcon={{ type: 'material', name: 'lock' }}
        label="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <Button mode="contained" onPress={login} style={styles.button}>
        Login
      </Button>

      <Button onPress={() => navigation.navigate('Register')} style={styles.button}>
        Create Account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 230,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 16,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default LoginScreen;
