import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Main from './Components/Main';
import Gallery from './Components/Gallery';
import CameraScreen from './Components/CameraScreen';
import BigPhoto from './Components/BigPhoto';

export default class App01 extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   render() {
      return (
         <NavigationContainer>
            <Stack.Navigator>
               <Stack.Screen
                  name="Main"
                  component={Main}
                  options={{
                     headerShown: false,
                     headerStyle: {
                        backgroundColor: '#0277bd',
                     },
                  }
                  }
               />
               <Stack.Screen
                  name="Gallery"
                  component={Gallery}
                  options={{
                     headerStyle: {
                        backgroundColor: '#0277bd',
                     },
                  }
                  }
               />
               <Stack.Screen
                  name="Camera"
                  component={CameraScreen}
                  options={{
                     headerStyle: {
                        backgroundColor: '#0277bd',
                     },
                  }
                  }
               />
               <Stack.Screen
                  name="BigPhoto"
                  component={BigPhoto}
                  options={{
                     headerStyle: {
                        backgroundColor: '#0277bd',
                     },
                  }
                  }
               />
            </Stack.Navigator>
         </NavigationContainer>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   }
})