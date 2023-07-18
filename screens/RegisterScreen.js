import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Volunteer Register")}
        >
          <View>
            <Image style={styles.icon} source={require("../assets/volunteericon.png")} />
          </View>
          <Text style={styles.buttonText}>Volunteer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Resident Register")}
        >
          <View>
            <Image style={styles.icon} source={require("../assets/icon.png")} />
          </View>
          <Text style={styles.buttonText}>Resident</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    width: 100,
    height: 100,
  },
});
