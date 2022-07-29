import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
/* @hide */
import Device from 'expo-device';
/* @end */
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [msg, setMsg] = useState('Loading...');

  useEffect(() => {
    (async () => {
      /* @hide */
      /* @end */
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setMsg(`${Date.now()}: ${location.coords.latitude}, ${location.coords.longitude}`);
      }, 1000);
      
    })();
  }, []);
  


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{msg}</Text>
    </View>
  );
}

/* @hide const styles = StyleSheet.create({ ... }); */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
/* @end */